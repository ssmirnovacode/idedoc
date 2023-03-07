import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';
 
const fileCache = localForage.createInstance({
  name: 'filecache'
});

export const unpkgPathPlugin = (inputCode: string) => {
  return {
    name: 'unpkg-path-plugin', 
    setup(build: esbuild.PluginBuild) { 

      // handle root entry file of index.js
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a'}
      });

      // handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        return { path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')?.href, namespace: 'a'}
      });

      build.onResolve({ filter: /.*/ }, async (args: any) => { // filter regex allows to control when onResolve gets executed       
          
      // handle main file of a module
      return {
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
            contents: inputCode,
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
