import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import './TextEditor.css';

const TextEditor = () => {

    const editorRef = useRef<HTMLDivElement | null>(null);
    const [ editing, setEditing ] = useState(false);
    const [ value, setValue ] = useState('Example')

    useEffect(() => {
        const clickHandler = (event: MouseEvent) => {
            if (editorRef?.current?.contains(event.target as Node)) return; // click inside the editor
            setEditing(false)
        }
        document.body.addEventListener('click', clickHandler, { capture: true })
        return () => document.removeEventListener('click', clickHandler, { capture: true })
    }, [])

    if (editing) {
        return  <div className="text-editor" ref={editorRef}>
                    <MDEditor 
                    value={value} 
                    onChange={(value) => setValue(value || '')} 
                    />
                </div>
    }

    return(
        <div className="text-editor card" onClick={() => setEditing(true)}>
            
                <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
            
        </div>
    )
};

export default TextEditor;