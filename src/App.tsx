import React, { useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

function App() {

  const [ input, setInput] = useState('');
  const [ code, setCode ] = useState('');
  const ref = useRef<any>()

  useEffect(() => {
    startService();
  }, [])

  const startService = async() => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm' // copied to 'public' from node_modules
    })
  }

  const handleClick = async () => {
    if (!ref.current) return;
    //transpiling:
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    })
    setCode(result?.outputFiles[0]?.text)
  }

  return (
    <div >
     <textarea onChange={e => setInput(e.target.value)} value={input}></textarea>
     <div>
      <button onClick={handleClick}>Submit</button>
     </div>
     <pre>{code}</pre>
    </div>
  );
}

export default App;
