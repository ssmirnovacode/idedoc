import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ActionType } from "./action-types";
import reducers from "./reducers";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.dispatch({
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
        id: '',
        type: 'code'
    }
})

store.dispatch({
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
        id: store.getState().cells.order[0],
        type: 'text'
    }
})

// store.dispatch({
//     type: ActionType.INSERT_CELL_BEFORE,
//     payload: {
//         id: '',
//         type: 'code'
//     }
// })

// store.dispatch({
//     type: ActionType.INSERT_CELL_BEFORE,
//     payload: {
//         id: '',
//         type: 'text'
//     }
// })

// console.log('created ---->', store.getState())

// const id = store.getState().cells.order[0];

// store.dispatch({
//     type: ActionType.UPDATE_CELL,
//     payload: {
//         id,
//         content: 'bla'
//     }
// })

// console.log('updated 1st cell ---->', store.getState())


// store.dispatch({
//     type: ActionType.UPDATE_CELL,
//     payload: {
//         id: store.getState().cells.order[2],
//         content: 'moved up to index 1'
//     }
// })



// store.dispatch({
//     type: ActionType.MOVE_CELL,
//     payload: {
//         id: store.getState().cells.order[2],
//         direction: 'up'
//     }
// })

// console.log('3rd cell to be moved up ---->', store.getState())

// store.dispatch({
//     type: ActionType.MOVE_CELL,
//     payload: {
//         id: store.getState().cells.order[2],
//         direction: 'down'
//     }
// })
// // localStorage.setItem('id', JSON.stringify(store.getState().cells.order[0]))


// console.log('final ---->', store.getState())