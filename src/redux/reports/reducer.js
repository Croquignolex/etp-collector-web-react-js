import * as actions from "./actions";

// Partial global store for users data management
const initialState = {
    list: [],
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set movements data
        case actions.STORE_SET_REPORTS_DATA:
            nextState = {...state, list: action.reports};
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce