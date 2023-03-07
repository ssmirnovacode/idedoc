import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';
 
const fileCache = localForage.createInstance({
  name: 'filecache'
});

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onLoad({ filter: /(^index\.js$)/ }, () => {
                return { loader: 'jsx', contents: inputCode,}
              });

            // checking cache in a separate block: if it returns smth, we got out contents, otherwise we go to handlers below
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const cachedData = await fileCache.getItem<esbuild.OnLoadResult>(args.path);       
                if (cachedData) return cachedData;
            });

            build.onLoad({ filter: /.css$/ }, async (args: any) => {
                
                const { data, request } = await axios.get(args.path);

                const escapedCss = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");

                const contents = ` 
                    const style = document.createElement('style');
                    style.innerText = '${escapedCss}';
                    document.head.appendChild(style);
                `;

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL('./', request.responseURL).pathname // describes the path where we found the original file
                };
        
                await fileCache.setItem(args.path, result);
        
                return result;
            });

            build.onLoad({ filter: /.*/ }, async (args: any) => {
        
                const { data, request } = await axios.get(args.path);

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname // describes the path where we found the original file
                };
        
                await fileCache.setItem(args.path, result);
        
                return result;
            });
        }
    }
}