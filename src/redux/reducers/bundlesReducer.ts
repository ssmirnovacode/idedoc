
import { ActionType } from "../action-types";
import {  BundleCompleteAction, BundleStartAction } from "../actions";


interface BundleState {
    [key: string]: {
        loading: boolean;
        code: string;
        err: string
    } | undefined
}

const initialState: BundleState = {};

const bundleReducer = (state: BundleState = initialState, action: BundleStartAction | BundleCompleteAction): BundleState => {
    switch(action.type) {
        case ActionType.BUNDLE_START:
            return {
                ...state,
                [action.payload.cellId]: {
                    loading: true,
                    err: '',
                    code: ''
                }
            }
        case ActionType.BUNDLE_COMPLETE:
            return {
                ...state,
                [action.payload.cellId]: {
                    loading: false,
                    err: action.payload.bundle.err,
                    code: action.payload.bundle.code,
                }
            }
        default:
            return state;
    }
}

export default bundleReducer;