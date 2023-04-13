import { Dispatch } from 'redux';
import bundle from '../../bundler';
import { ActionType } from '../action-types';
import {
  Action,
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InertCellBeforeAction,
  Direction,
} from '../actions';
import { Cell, CellTypes } from '../cell';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: {
      id,
    },
  };
};

export const insertCellBefore = (id: string, cellType: CellTypes): InertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });
    try {
      const response = await fetch('/cells');
      const data: Cell[] = (await response.json()) || {};

      dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: ActionType.FETCH_CELLS_ERROR,
          payload: err.message,
        });
      }
    }
  };
};

export const actionCreators = {
  updateCell,
  deleteCell,
  moveCell,
  insertCellBefore,
  createBundle,
};

// } catch (err) {
//     if (err instanceof Error) {
//       dispatch({
//         type: ActionType.SAVE_CELLS_ERROR,
//         payload: err.message,
//       });
//     }
//   }
