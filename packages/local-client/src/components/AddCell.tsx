import { useActions } from '../hooks/useActions';
import './AddCell.css';
import { BsPlusCircle } from 'react-icons/bs'

interface AddCellProps {
    nextCellId: string
}

const AddCell = (props: AddCellProps) => {

    const { insertCellBefore} = useActions();

    return (
        <div className={props.nextCellId ? 'add-cell' : 'add-cell only' }>
            <div className='add-buttons'>
                <button className='button is-rounded is-primary is-small' onClick={() => insertCellBefore(props.nextCellId, 'code')}><BsPlusCircle /> Code</button>
                <button className='button is-rounded is-primary is-small' onClick={() => insertCellBefore(props.nextCellId, 'text')}><BsPlusCircle /> Text</button>
            </div>
            <div className='divider'></div>
        </div>
    )
}

export default AddCell;