import React, {useEffect} from 'react';
import CodeEditor from './code-editor';
import Resizable from './Resizable';
import Preview from './Preview';
import { Cell } from '../redux';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import './CodeCell.css'

interface CodeCellProps {
  cell: Cell
}

// a unit of multiple code editor windows
const CodeCell = (props: CodeCellProps) => {
  const { content, id } = props.cell;

  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(({ bundle }) => bundle[id]);

// auto-bundling once user stops typing for 1 sec and rendering the result in Preview
  useEffect(() => {
    if (!bundle) {
      createBundle(id, content);
      return
    }
    const timer = setTimeout(async() => {
      createBundle(id, content)
    }, 1000)
    return () => clearTimeout(timer)
  }, [id, content, createBundle]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}} >
        <Resizable direction="horizontal">
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
