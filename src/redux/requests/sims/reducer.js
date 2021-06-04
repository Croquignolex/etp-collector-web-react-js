import * as actions from "./actions";
import {requestFailedValue, requestInitValue, requestSucceededValue} from "../../../functions/reduxFunctions";

// Partial global store for requests data management
const initialState = {
    all: {failed: false, loading: false, succeeded: false, message: ""},
    list: {failed: false, loading: false, succeeded: false, message: ""},
    next: {failed: false, loading: false, succeeded: false, message: ""},
    collector: {failed: false, loading: false, succeeded: false, message: ""},
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // ======================================================== Sims
        // Resolve event to set sims init request store data
        case actions.STORE_SIMS_REQUEST_INIT:
            nextState = {...state, list: requestInitValue()};
            return nextState || state;
        // Resolve event to set sims failed request store data
        case actions.STORE_SIMS_REQUEST_FAILED:
            nextState = {...state, list: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set sims succeeded request store data
        case actions.STORE_SIMS_REQUEST_SUCCEEDED:
            nextState = {...state, list: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set sims reset request store data
        case actions.STORE_SIMS_REQUEST_RESET:
            nextState = {...state, list: initialState.list};
            return nextState || state;
        // ======================================================== Next sims
        // Resolve event to set next sims init request store data
        case actions.STORE_NEXT_SIMS_REQUEST_INIT:
            nextState = {...state, next: requestInitValue()};
            return nextState || state;
        // Resolve event to set next sims failed request store data
        case actions.STORE_NEXT_SIMS_REQUEST_FAILED:
            nextState = {...state, next: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set next sims succeeded request store data
        case actions.STORE_NEXT_SIMS_REQUEST_SUCCEEDED:
            nextState = {...state, next: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set next sims reset request store data
        case actions.STORE_NEXT_SIMS_REQUEST_RESET:
            nextState = {...state, next: initialState.next};
            return nextState || state;
        // ======================================================== All sims
        // Resolve event to set all sims  init request store data
        case actions.STORE_ALL_SIMS_REQUEST_INIT:
            nextState = {...state, all: requestInitValue()};
            return nextState || state;
        // Resolve event to set all sims failed request store data
        case actions.STORE_ALL_SIMS_REQUEST_FAILED:
            nextState = {...state, all: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set all sims succeeded request store data
        case actions.STORE_ALL_SIMS_REQUEST_SUCCEEDED:
            nextState = {...state, all: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set all sims reset request store data
        case actions.STORE_ALL_SIMS_REQUEST_RESET:
            nextState = {...state, all: initialState.all};
            return nextState || state;
        // ======================================================== All collector sims
        // Resolve event to set all collector sims init request store data
        case actions.STORE_ALL_COLLECTOR_SIMS_REQUEST_INIT:
            nextState = {...state, collector: requestInitValue()};
            return nextState || state;
        // Resolve event to set all collector sims failed request store data
        case actions.STORE_ALL_COLLECTOR_SIMS_REQUEST_FAILED:
            nextState = {...state, collector: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set all collector sims succeeded request store data
        case actions.STORE_ALL_COLLECTOR_SIMS_REQUEST_SUCCEEDED:
            nextState = {...state, collector: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set all collector sims reset request store data
        case actions.STORE_ALL_COLLECTOR_SIMS_REQUEST_RESET:
            nextState = {...state, collector: initialState.collector};
            return nextState || state;
        // ========================================================
        // Unknown action
        default: return state;
    }
}

export default reduce
