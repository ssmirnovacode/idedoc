import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import { useActions } from "../hooks/useActions";
import { Cell } from "../redux";
import './TextEditor.css';

interface TextEditorProps {
    cell: Cell
}

const TextEditor = (props: TextEditorProps) => {
    const { content, id } = props.cell || {};

    const editorRef = useRef<HTMLDivElement | null>(null);
    const [ editing, setEditing ] = useState(false);
    
    const { updateCell } = useActions();

    useEffect(() => {
        const clickHandler = (event: MouseEvent) => {
            if (editorRef?.current?.contains(event.target as Node)) return; // click inside the editor
            setEditing(false)
        }
        document.body.addEventListener('click', clickHandler, { capture: true })
        return () => document.removeEventListener('click', clickHandler, { capture: true })
    }, [])

    if (editing) {
        return  (<div className="text-editor" ref={editorRef}>
                    <MDEditor 
                    value={content} 
                    onChange={(value) => updateCell(id, value || '')} 
                    />
                </div>)
    }

    return(
        <div className="text-editor card" onClick={() => setEditing(true)}>
            
                <MDEditor.Markdown source={content || 'Click to edit'} style={{ whiteSpace: 'pre-wrap' }} />
            
        </div>
    )
};

export default TextEditor;