import * as actions from "./actions";
import {requestFailedValue, requestInitValue, requestSucceededValue} from "../../../functions/reduxFunctions";

// Partial global store for requests data management
const initialState = {
    add: {failed: false, loading: false, succeeded: false, message: ""},
    list: {failed: false, loading: false, succeeded: false, message: ""},
    next: {failed: false, loading: false, succeeded: false, message: ""},
    apply: {failed: false, loading: false, succeeded: false, message: ""},
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // ======================================================== Liquidates
        // Resolve event to set liquidates init request store data
        case actions.STORE_LIQUIDATES_REQUEST_INIT:
            nextState = {...state, list: requestInitValue()};
            return nextState || state;
        // Resolve event to set liquidates failed request store data
        case actions.STORE_LIQUIDATES_REQUEST_FAILED:
            nextState = {...state, list: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set liquidates succeeded request store data
        case actions.STORE_LIQUIDATES_REQUEST_SUCCEEDED:
            nextState = {...state, list: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set liquidates reset request store data
        case actions.STORE_LIQUIDATES_REQUEST_RESET:
            nextState = {...state, list: initialState.list};
            return nextState || state;
        // ======================================================== Next liquidates
        // Resolve event to set next liquidates init request store data
        case actions.STORE_NEXT_LIQUIDATES_REQUEST_INIT:
            nextState = {...state, next: requestInitValue()};
            return nextState || state;
        // Resolve event to set next liquidates failed request store data
        case actions.STORE_NEXT_LIQUIDATES_REQUEST_FAILED:
            nextState = {...state, next: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set next liquidates succeeded request store data
        case actions.STORE_NEXT_LIQUIDATES_REQUEST_SUCCEEDED:
            nextState = {...state, next: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set next liquidates reset request store data
        case actions.STORE_NEXT_LIQUIDATES_REQUEST_RESET:
            nextState = {...state, next: initialState.next};
            return nextState || state;
        // ======================================================== Add liquidate
        // Resolve event to set add liquidate init request store data
        case actions.STORE_ADD_LIQUIDATE_REQUEST_INIT:
            nextState = {...state, add: requestInitValue()};
            return nextState || state;
        // Resolve event to set add liquidate failed request store data
        case actions.STORE_ADD_LIQUIDATE_REQUEST_FAILED:
            nextState = {...state, add: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set add liquidate succeeded request store data
        case actions.STORE_ADD_LIQUIDATE_REQUEST_SUCCEEDED:
            nextState = {...state, add: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set add liquidate reset request store data
        case actions.STORE_ADD_LIQUIDATE_REQUEST_RESET:
            nextState = {...state, add: initialState.add};
            return nextState || state;
        // ======================================================== Confirm liquidate
        // Resolve event to set confirm liquidate init request store data
        case actions.STORE_CONFIRM_LIQUIDATE_REQUEST_INIT:
            nextState = {...state, apply: requestInitValue()};
            return nextState || state;
        // Resolve event to set confirm liquidate failed request store data
        case actions.STORE_CONFIRM_LIQUIDATE_REQUEST_FAILED:
            nextState = {...state, apply: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set confirm liquidate succeeded request store data
        case actions.STORE_CONFIRM_LIQUIDATE_REQUEST_SUCCEEDED:
            nextState = {...state, apply: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set confirm liquidate reset request store data
        case actions.STORE_CONFIRM_LIQUIDATE_REQUEST_RESET:
            nextState = {...state, apply: initialState.apply};
            return nextState || state;
        // ========================================================
        // Unknown action
        default: return state;
    }
}

export default reduce
