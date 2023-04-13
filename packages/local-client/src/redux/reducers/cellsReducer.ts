import { ActionCreator } from 'redux';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = (state: CellsState = initialState, action: Action): CellsState => {
  const xIndex =
    action.type === ActionType.MOVE_CELL ||
    action.type === ActionType.DELETE_CELL ||
    action.type === ActionType.INSERT_CELL_BEFORE ||
    action.type === ActionType.UPDATE_CELL
      ? state.order.findIndex((item) => item === action.payload.id)
      : NaN;
  switch (action.type) {
    case ActionType.SAVE_CELLS_ERROR:
      return { ...state, error: action.payload };
    case ActionType.FETCH_CELLS:
      return { ...state, loading: true, error: null };
    case ActionType.FETCH_CELLS_COMPLETE: {
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as CellsState['data']),
        order: action.payload.map((cell) => cell.id),
      };
    }
    case ActionType.FETCH_CELLS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ActionType.UPDATE_CELL:
      const { id, content } = action?.payload || {};
      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            content: content,
          },
        },
      };
    case ActionType.DELETE_CELL:
      const updatedData = { ...state.data };
      delete updatedData[action.payload.id];
      return {
        ...state,
        order: [...state.order.slice(0, xIndex), ...state.order.slice(xIndex + 1)],
        data: {
          ...updatedData,
        },
      };
    case ActionType.MOVE_CELL:
      if (
        (xIndex === 0 && action.payload.direction === 'up') ||
        (xIndex === state.order.length - 1 && action.payload.direction === 'down')
      )
        return state;
      return {
        ...state,
        order:
          action.payload.direction === 'up'
            ? [
                ...state.order.slice(0, xIndex - 1),
                action.payload.id,
                state.order[xIndex - 1],
                ...state.order.slice(xIndex + 1),
              ]
            : [
                ...state.order.slice(0, xIndex),
                state.order[xIndex + 1],
                action.payload.id,
                ...state.order.slice(xIndex + 2),
              ],
      };
    case ActionType.INSERT_CELL_BEFORE:
      const newId = Math.random().toString();
      // first cell or added to the end
      if (!action.payload.id) {
        return {
          ...state,
          order: [...state.order, newId],
          data: {
            ...state.data,
            [newId]: {
              id: newId,
              type: action.payload.type,
              content: '',
            },
          },
        };
      }
      return {
        ...state,
        order: [...state.order.slice(0, xIndex), newId, state.order[xIndex], ...state.order.slice(xIndex + 1)],
        data: {
          ...state.data,
          [newId]: {
            id: newId,
            type: action.payload.type,
            content: '',
          },
        },
      };
    default:
      return state;
  }
};

export default reducer;
