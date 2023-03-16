import React, {useEffect, useState } from 'react';
import bundle from '../bundler';
import CodeEditor from './code-editor';
import Resizable from './Resizable';
import Preview from './Preview';

// a unit of multiple code editor windows
const CodeCell = () => {
  
  const [ input, setInput] = useState('');
  const [ code, setCode ] = useState('');
  const [ error, setError ] = useState('');

// auto-bundling once user stops typing for 1 sec and rendering the result in Preview
  useEffect(() => {
    const timer = setTimeout(async() => {
      const output = await bundle(input);
      setCode(output?.code);
      setError(output?.err);
    }, 1000)
    return () => clearTimeout(timer)
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}} >
        <Resizable direction="horizontal">
          <CodeEditor initialValue={"const a = 1;"} onChange={value => setInput(value)} />
        </Resizable>
      <Preview code={code} err={error} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
