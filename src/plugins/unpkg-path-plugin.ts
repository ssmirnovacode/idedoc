import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';
 
const fileCache = localForage.createInstance({
  name: 'filecache'
});

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin', // just for debugging
    setup(build: esbuild.PluginBuild) { // build represents the entire bundling process
    // resolve - figuring out where index.js is stored  
    build.onResolve({ filter: /.*/ }, async (args: any) => { // filter regex allows to control when onResolve gets executed
        console.log('onResolve', args);
        // overriding
        // namespace is another filter that can be applied onLoad with 'filter' - by namespace
        if (args.path === 'index.js') return { path: args.path, namespace: 'a' };
        
        // checking if a file has a relative path import:
        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')?.href, // creating full URL for other imports inside the imported module
            namespace: 'a'
          }
        }
        
        else return {
            path: `https://unpkg.com/${args.path}`,
            namespace: 'a'
          }
      });
      
      // attempt to load the content of index.js from FS and overriding standard ESBuild behavior
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        // returning what we want to be passed to ESBuild
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('react');
              console.log(message);
            `,
          };
        } 

        const cachedData = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

        if (cachedData) {
          return cachedData;
        }

        const { data, request } = await axios.get(args.path);
       
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname // describes the path where we found the original file
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
