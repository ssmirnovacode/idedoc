import React, {useEffect} from 'react';
import CodeEditor from './code-editor';
import Resizable from './Resizable';
import Preview from './Preview';
import { Cell } from '../redux';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import './CodeCell.css'
import { useCumulativeCode } from '../hooks/useCumulativeCode';

interface CodeCellProps {
  cell: Cell
}

// a unit of multiple code editor windows
const CodeCell = (props: CodeCellProps) => {
  const { content, id } = props.cell;

  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(({ bundle }) => bundle[id]);
  
  const cumulativeCode = useCumulativeCode(id);

// auto-bundling once user stops typing for 1 sec and rendering the result in Preview
  useEffect(() => {
    if (!bundle) {
      createBundle(id, cumulativeCode);
      return
    }
    const timer = setTimeout(async() => {
      createBundle(id, cumulativeCode)
    }, 1000)
    return () => clearTimeout(timer)
  }, [id, cumulativeCode, createBundle]);

  const saveCodeHandler = async () => {
    try {
      const response = await fetch('http://localhost:3001/', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({bundle: bundle?.code})
      })
      const res = await response.json();
      console.log(res)
    } catch(err: any) {
      console.error(err?.message)
    }
  }

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}} >
        <Resizable direction="horizontal">
          <button onClick={saveCodeHandler}>SAVE</button>
          <CodeEditor initialValue={content} onChange={value => updateCell(id, value)} />
        </Resizable>
        <div className='progress-wrapper'>
          { !bundle || bundle.loading ? 
            
              <div className='progress-cover'>
                <progress className='progress is-small is-primary' max='100'>
                  Loading...
                </progress>
              </div>
            : 
            <Preview code={bundle.code} err={bundle.err} />
          }
        </div>
      </div>
    </Resizable>
  );
}

export default CodeCell;
