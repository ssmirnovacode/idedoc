import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
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
    },
  };
};
