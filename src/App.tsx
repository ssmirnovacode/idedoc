import React, { useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetchPlugin';
import CodeEditor from './components/code-editor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from './components/Rreview';

function App() {

  const ref = useRef<any>()
  
  const [ input, setInput] = useState('');
  const [ code, setCode ] = useState('')

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
    setCode(result.outputFiles[0].text)
  }

  return (
    <div >
      <CodeEditor initialValue={"const a = 1;"} onChange={value => setInput(value)} />
     <div>
      <button onClick={handleClick}>Submit</button>
     </div>
     <Preview code={code} />
    </div>
  );
}

export default App;
