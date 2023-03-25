import { ActionType } from "../action-types"; 
import { Action, DeleteCellAction, InertCellBeforeAction, MoveCellAction, UpdateCellAction } from "../actions";
import { Cell } from "../cell";

interface CellsState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell
    }
}

const initialState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {}
}

const reducer = (state: CellsState = initialState, action: MoveCellAction | DeleteCellAction | InertCellBeforeAction | UpdateCellAction): CellsState => {
    const xIndex = state.order.findIndex(item => item === action.payload.id);
    switch(action.type) {
        case ActionType.UPDATE_CELL:
            const { id, content } = action?.payload || {};
            return {
                ...state,
                data:{ ...state.data, [id]: {
                    ...state.data[id],
                    content: content
                }}
            };
        case ActionType.DELETE_CELL:
            
            const updatedData = { ...state.data};
            delete updatedData[action.payload.id];
            return {
                ...state,
                order: [ ...state.order.slice(0, xIndex), ...state.order.slice(xIndex+1)],
                data: {
                    ...updatedData
                }
            };
        case ActionType.MOVE_CELL:
            if ((xIndex === 0 && action.payload.direction === 'up') ||( xIndex === state.order.length-1 && action.payload.direction === 'down')) return state;
            return {
                ...state,
                order: action.payload.direction === 'up' ? 
                                [ ...state.order.slice(0, xIndex - 1), action.payload.id, state.order[xIndex - 1],  ...state.order.slice(xIndex+1)] :
                                [ ...state.order.slice(0, xIndex), state.order[xIndex+1], action.payload.id, ...state.order.slice(xIndex+2)]
            };
        case ActionType.INSERT_CELL_BEFORE:
            const newId = Math.random().toString();
            // first cell or added to the end
            if (!action.payload.id) {
                return {
                    ...state,
                    order: [ ...state.order, newId ],
                    data: {
                        ...state.data,
                        [newId]: {
                            id: newId,
                            type: action.payload.type,
                            content: ''
                        }
                    }
                }
            }
            return {
                    ...state,
                    order: [ ...state.order.slice(0, xIndex), newId, state.order[xIndex], ...state.order.slice(xIndex+1) ],
                    data: {
                        ...state.data,
                        [newId]: {
                            id: newId,
                            type: action.payload.type,
                            content: ''
                        }
                    }
            };
        default:
            return state;
    }
}

export default reducer;