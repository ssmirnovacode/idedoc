import React, { useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetchPlugin';
import CodeEditor from './components/code-editor';

function App() {

  const ref = useRef<any>()
  const iframeRef = useRef<any>();
  const [ input, setInput] = useState('');
  

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

    // refreshing/resetting the iframe content:
    iframeRef.current.srcdoc = html;

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
            try {
              eval(event.data)
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime error: </h4>' + err + '</div>';
              console.error(err);
            }
          }, false)
        </script>
      </body>
    </html>
  `

  return (
    <div >
      <CodeEditor />
     <textarea onChange={e => setInput(e.target.value)} value={input}></textarea>
     <div>
      <button onClick={handleClick}>Submit</button>
     </div>
     <iframe ref={iframeRef} sandbox="allow-scripts" title="preview-display" srcDoc={html} />
    </div>
  );
}

export default App;
