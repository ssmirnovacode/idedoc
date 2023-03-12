import React, {useState } from 'react';
import bundle from '../bundler';
import CodeEditor from './code-editor';
import Resizable from './Resizable';
import Preview from './Preview';

// a unit of multiple code editor windows
const CodeCell = () => {
  
  const [ input, setInput] = useState('');
  const [ code, setCode ] = useState('')

  const handleClick = async () => {
    const output = await bundle(input);
    setCode(output);
  }

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}} >
        <CodeEditor initialValue={"const a = 1;"} onChange={value => setInput(value)} />
      
      <Preview code={code} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
