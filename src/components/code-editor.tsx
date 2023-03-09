import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

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
        console.log(editorRef.current)
        const unformatted: string = editorRef?.current?.getModel().getValue();
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [ parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        });

        editorRef.current.setValue(formatted);
    }
    return <>
        <button onClick={onFormatClick}>Format</button>
        <MonacoEditor 
            editorDidMount={onEditorDidMount}
            value={initialValue} // initialValue
            theme="dark" 
            language="javascript" 
            height="500px" 
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
        />;
    </>
};

export default CodeEditor;