import { useActions } from "../hooks/useActions";

import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'
import './ActionBar.css'

interface ActionBarProps {
    id: string
}

const ActionBar = (props: ActionBarProps) => {

    const { moveCell, deleteCell } = useActions();

    return <div className="action-bar">
        <button className="button button-format is-primary is-small action-btn" onClick={() => moveCell(props.id, 'up')}><BsArrowUp /></button>
        <button className="button button-format is-primary is-small action-btn" onClick={() => moveCell(props.id, 'down')}><BsArrowDown /></button>
        <button className="button button-format is-primary is-small action-btn" onClick={() => deleteCell(props.id)}><AiOutlineDelete/></button>
    </div>
}

export default ActionBar;