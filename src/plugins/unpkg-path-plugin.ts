import * as esbuild from 'esbuild-wasm';
 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin', // just for debugging
    setup(build: esbuild.PluginBuild) { // build represents the entire bundling process
    // resolve - figuring out where index.js is stored  
    build.onResolve({ filter: /.*/ }, async (args: any) => { // filter regex allows to control when onResolve gets executed
        console.log('onResolve', args);
        return { path: args.path, namespace: 'a' }; // overriding
        // namespace is another filter that can be applied onLoad with 'filter' - by namespace
      });
      
      // attempt to load the content of index.js from FS and overriding standard ESBuild behavior
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        // returning what we want to be passed to ESBuild
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import message from './message';
              console.log(message);
            `,
          };
        } else {
          return {
            loader: 'jsx',
            contents: 'export default "hi there!"',
          };
        }
      });
    },
  };
};
