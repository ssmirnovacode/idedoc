import React, { useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetchPlugin';

function App() {

  const ref = useRef<any>()
  const iframeRef = useRef<any>();
  const [ input, setInput] = useState('');
  const [ code, setCode ] = useState('');
  

  useEffect(() => {
    startService();
  }, [])

  const startService = async() => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm' 
    })
  }

  const handleClick = async () => {
    if (!ref.current) return;
    //transpiling:
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    })
    // setCode(result?.outputFiles[0]?.text)
    iframeRef?.current?.contentWindow.postMessage(result?.outputFiles[0]?.text, '*');
  }

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', event => {
            eval(event.data)
          }, false)
        </script>
      </body>
    </html>
  `

  return (
    <div >
     <textarea onChange={e => setInput(e.target.value)} value={input}></textarea>
     <div>
      <button onClick={handleClick}>Submit</button>
     </div>
     <pre>{code}</pre>
     <iframe ref={iframeRef} sandbox="allow-scripts" title="display" srcDoc={html} />
    </div>
  );
}

export default App;
