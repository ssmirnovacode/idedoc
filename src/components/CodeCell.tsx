import React, {useEffect, useState } from 'react';
import bundle from '../bundler';
import CodeEditor from './code-editor';
import Resizable from './Resizable';
import Preview from './Preview';
import { Cell } from '../redux';
import { useActions } from '../hooks/useActions';

interface CodeCellProps {
  cell: Cell
}

// a unit of multiple code editor windows
const CodeCell = (props: CodeCellProps) => {
  const { content, id } = props.cell;
  
  const [ code, setCode ] = useState('');
  const [ error, setError ] = useState('')

  const { updateCell } = useActions();

// auto-bundling once user stops typing for 1 sec and rendering the result in Preview
  useEffect(() => {
    const timer = setTimeout(async() => {
      const output = await bundle(content);
      setCode(output?.code);
      setError(output?.err);
    }, 1000)
    return () => clearTimeout(timer)
  }, [content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}} >
        <Resizable direction="horizontal">
          <CodeEditor initialValue={content} onChange={value => updateCell(id, value)} />
        </Resizable>
      <Preview code={code} err={error} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
