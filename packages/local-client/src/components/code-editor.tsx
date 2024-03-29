import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css';

interface CodeEditorProps {
    initialValue: string;
    onChange: (value: string) => void;
}

const CodeEditor = ({ initialValue, onChange }: CodeEditorProps) => {
    const editorRef = useRef<any>();

    const onEditorDidMount: EditorDidMount = (getCurrentValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getCurrentValue())
        })

        monacoEditor.getModel()?.updateOptions({ tabSize:2 })
    }

    const onFormatClick = () => {
        const unformatted: string = editorRef?.current?.getModel().getValue();
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [ parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        })
        .replace(/\n$/, ''); // removing \n automatically injected by prettier

        editorRef.current.setValue(formatted);
    }
    return (
        <div className='editor-wrapper'>
            <button className='button button-format is-primary is-small' onClick={onFormatClick}>Format</button>
            <MonacoEditor 
                editorDidMount={onEditorDidMount}
                value={initialValue} // initialValue
                theme="dark" 
                language="javascript" 
                height="100%" 
                options={{
                    wordWrap: 'on',
                    minimap: { enabled: false},
                    showUnused: false,
                    folding: false, 
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true
                }}
            />
        </div>
    )
};

export default CodeEditor;