import { Cell } from "../redux";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";


interface CellListItemProps {
    cell: Cell
}

const CellListItem = (props: CellListItemProps) => {

    return(
        <div>
            {
            props.cell.type === 'code' ?
            <CodeCell cell={props.cell} /> :
             <TextEditor cell={props.cell} />
        }
            </div>
    )
}

export default CellListItem;