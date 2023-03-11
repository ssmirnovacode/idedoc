import React, {useState } from 'react';
import bundle from './bundler';
import CodeEditor from './components/code-editor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from './components/Rreview';

function App() {
  
  const [ input, setInput] = useState('');
  const [ code, setCode ] = useState('')

  const handleClick = async () => {
    const output = await bundle(input);
    setCode(output);
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
