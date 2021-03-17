import * as actions from "./actions";

// Partial global store for users data management
const initialState = {
    page: 1,
    list: [],
    hasMoreData: false
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set liquidates data
        case actions.STORE_SET_LIQUIDATES_DATA:
            nextState = {list: action.liquidates, page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to set next liquidates data
        case actions.STORE_SET_NEXT_LIQUIDATES_DATA:
            nextState = {list: [...state.list, ...action.liquidates], page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to stop infinite scroll liquidates data
        case actions.STORE_STOP_INFINITE_SCROLL_LIQUIDATE_DATA:
            nextState = {...state, hasMoreData: false};
            return nextState || state;
        // Resolve event to set new liquidate data
        case actions.STORE_SET_NEW_LIQUIDATE_DATA:
            nextState = {...state, list: [action.liquidate, ...state.list]}
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce