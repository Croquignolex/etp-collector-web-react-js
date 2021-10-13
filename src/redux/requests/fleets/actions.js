// Reducer action types
export const STORE_FLEETS_REQUEST_INIT = 'STORE_FLEETS_REQUEST_INIT';
export const STORE_FLEETS_REQUEST_RESET = 'STORE_FLEETS_REQUEST_RESET';
export const STORE_FLEETS_REQUEST_FAILED = 'STORE_FLEETS_REQUEST_FAILED';
export const STORE_FLEETS_REQUEST_SUCCEEDED = 'STORE_FLEETS_REQUEST_SUCCEEDED';

export const STORE_NEXT_FLEETS_REQUEST_INIT = 'STORE_NEXT_FLEETS_REQUEST_INIT';
export const STORE_NEXT_FLEETS_REQUEST_RESET = 'STORE_NEXT_FLEETS_REQUEST_RESET';
export const STORE_NEXT_FLEETS_REQUEST_FAILED = 'STORE_NEXT_FLEETS_REQUEST_FAILED';
export const STORE_NEXT_FLEETS_REQUEST_SUCCEEDED = 'STORE_NEXT_FLEETS_REQUEST_SUCCEEDED';

export const STORE_ALL_FLEETS_REQUEST_INIT = 'STORE_ALL_FLEETS_REQUEST_INIT';
export const STORE_ALL_FLEETS_REQUEST_RESET = 'STORE_ALL_FLEETS_REQUEST_RESET';
export const STORE_ALL_FLEETS_REQUEST_FAILED = 'STORE_ALL_FLEETS_REQUEST_FAILED';
export const STORE_ALL_FLEETS_REQUEST_SUCCEEDED = 'STORE_ALL_FLEETS_REQUEST_SUCCEEDED';

export const STORE_ADD_FLEET_REQUEST_INIT = 'STORE_ADD_FLEET_REQUEST_INIT';
export const STORE_ADD_FLEET_REQUEST_RESET = 'STORE_ADD_FLEET_REQUEST_RESET';
export const STORE_ADD_FLEET_REQUEST_FAILED = 'STORE_ADD_FLEET_REQUEST_FAILED';
export const STORE_ADD_FLEET_REQUEST_SUCCEEDED = 'STORE_ADD_FLEET_REQUEST_SUCCEEDED';

export const STORE_CANCEL_FLEET_REQUEST_INIT = 'STORE_CANCEL_FLEET_REQUEST_INIT';
export const STORE_CANCEL_FLEET_REQUEST_RESET = 'STORE_CANCEL_FLEET_REQUEST_RESET';
export const STORE_CANCEL_FLEET_REQUEST_FAILED = 'STORE_CANCEL_FLEET_REQUEST_FAILED';
export const STORE_CANCEL_FLEET_REQUEST_SUCCEEDED = 'STORE_CANCEL_FLEET_REQUEST_SUCCEEDED';

// ======================================================== Fleets
// Set outlays init data into store
export const storeFleetsRequestInit = () => ({
    type: STORE_FLEETS_REQUEST_INIT
});

// Set outlays failed data into store
export const storeFleetsRequestFailed = ({message}) => ({
    message,
    type: STORE_FLEETS_REQUEST_FAILED
});

// Set outlays succeeded data into store
export const storeFleetsRequestSucceed = ({message}) => ({
    message,
    type: STORE_FLEETS_REQUEST_SUCCEEDED
});

// Set outlays reset data into store
export const storeFleetsRequestReset = () => ({
    type: STORE_FLEETS_REQUEST_RESET
});
// ======================================================== Next outlays
// Set next outlays init data into store
export const storeNextFleetsRequestInit = () => ({
    type: STORE_NEXT_FLEETS_REQUEST_INIT
});

// Set next outlays failed data into store
export const storeNextFleetsRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_FLEETS_REQUEST_FAILED
});

// Set next outlays succeeded data into store
export const storeNextFleetsRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_FLEETS_REQUEST_SUCCEEDED
});

// Set next outlays reset data into store
export const storeNextFleetsRequestReset = () => ({
    type: STORE_NEXT_FLEETS_REQUEST_RESET
});
// ======================================================== All outlays
// Set all outlays init data into store
export const storeAllFleetsRequestInit = () => ({
    type: STORE_ALL_FLEETS_REQUEST_INIT
});

// Set all outlays failed data into store
export const storeAllFleetsRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_FLEETS_REQUEST_FAILED
});

// Set all outlays succeeded data into store
export const storeAllFleetsRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_FLEETS_REQUEST_SUCCEEDED
});

// Set all outlays reset data into store
export const storeAllFleetsRequestReset = () => ({
    type: STORE_ALL_FLEETS_REQUEST_RESET
});
// ======================================================== Add outlay
// Set add outlay init data into store
export const storeAddFleetRequestInit = () => ({
    type: STORE_ADD_FLEET_REQUEST_INIT
});

// Set add outlay failed data into store
export const storeAddFleetRequestFailed = ({message}) => ({
    message,
    type: STORE_ADD_FLEET_REQUEST_FAILED
});

// Set add outlay succeeded data into store
export const storeAddFleetRequestSucceed = ({message}) => ({
    message,
    type: STORE_ADD_FLEET_REQUEST_SUCCEEDED
});

// Set add outlay reset data into store
export const storeAddFleetRequestReset = () => ({
    type: STORE_ADD_FLEET_REQUEST_RESET
});
// ======================================================== Cancel outlay
// Set cancel outlay init data into store
export const storeCancelFleetRequestInit = () => ({
    type: STORE_CANCEL_FLEET_REQUEST_INIT
});

// Set cancel outlay failed data into store
export const storeCancelFleetRequestFailed = ({message}) => ({
    message,
    type: STORE_CANCEL_FLEET_REQUEST_FAILED
});

// Set cancel outlay succeeded data into store
export const storeCancelFleetRequestSucceed = ({message}) => ({
    message,
    type: STORE_CANCEL_FLEET_REQUEST_SUCCEEDED
});

// Set cancel outlay reset data into store
export const storeCancelFleetRequestReset = () => ({
    type: STORE_CANCEL_FLEET_REQUEST_RESET
});
