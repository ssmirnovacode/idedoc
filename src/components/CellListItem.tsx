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
            <CodeCell /> : <TextEditor />
        }
            </div>
    )
}

export default CellListItem;