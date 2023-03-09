import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
    initialValue: string;
    onChange: (value: string) => void;
}

const CodeEditor = ({ initialValue, onChange}: CodeEditorProps) => {

    const onEditorDidMount = (getCurrentValue: () => string, editorRef: any) => {
        editorRef.onDidChangeModelContent(() => {
            onChange(getCurrentValue())
        })
    }
    return <MonacoEditor 
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
};

export default CodeEditor;