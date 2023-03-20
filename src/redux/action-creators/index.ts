import { ActionType } from "../action-types";
import { Action, UpdateCellAction, DeleteCellAction, MoveCellAction, InertCellBeforeAction, Direction } from "../actions";
import { CellTypes } from "../cell";

export const updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id,
            content
        }
    }
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id,
            direction
        }
    }
};

export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: {
            id
        }
    }
};

export const insertCellBefore = (id: string, cellType: CellTypes): InertCellBeforeAction => {
    return {
        type: ActionType.INSERT_CELL_BEFORE,
        payload: {
            id,
            type: cellType
        }
    }
};

export const actionCreators = { updateCell, deleteCell, moveCell, insertCellBefore}