// Reducer action types
export const STORE_SUPPLIES_REQUEST_INIT = 'STORE_SUPPLIES_REQUEST_INIT';
export const STORE_SUPPLIES_REQUEST_RESET = 'STORE_SUPPLIES_REQUEST_RESET';
export const STORE_SUPPLIES_REQUEST_FAILED = 'STORE_SUPPLIES_REQUEST_FAILED';
export const STORE_SUPPLIES_REQUEST_SUCCEEDED = 'STORE_SUPPLIES_REQUEST_SUCCEEDED';

export const STORE_NEXT_SUPPLIES_REQUEST_INIT = 'STORE_NEXT_SUPPLIES_REQUEST_INIT';
export const STORE_NEXT_SUPPLIES_REQUEST_RESET = 'STORE_NEXT_SUPPLIES_REQUEST_RESET';
export const STORE_NEXT_SUPPLIES_REQUEST_FAILED = 'STORE_NEXT_SUPPLIES_REQUEST_FAILED';
export const STORE_NEXT_SUPPLIES_REQUEST_SUCCEEDED = 'STORE_NEXT_SUPPLIES_REQUEST_SUCCEEDED';

// ======================================================== Supplies
// Set supplies init data into store
export const storeSuppliesRequestInit = () => ({
    type: STORE_SUPPLIES_REQUEST_INIT
});

// Set supplies failed data into store
export const storeSuppliesRequestFailed = ({message}) => ({
    message,
    type: STORE_SUPPLIES_REQUEST_FAILED
});

// Set supplies succeeded data into store
export const storeSuppliesRequestSucceed = ({message}) => ({
    message,
    type: STORE_SUPPLIES_REQUEST_SUCCEEDED
});

// Set supplies reset data into store
export const storeSuppliesRequestReset = () => ({
    type: STORE_SUPPLIES_REQUEST_RESET
});
// ======================================================== Next supplies
// Set next supplies init data into store
export const storeNextSuppliesRequestInit = () => ({
    type: STORE_NEXT_SUPPLIES_REQUEST_INIT
});

// Set next supplies failed data into store
export const storeNextSuppliesRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_SUPPLIES_REQUEST_FAILED
});

// Set next supplies succeeded data into store
export const storeNextSuppliesRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_SUPPLIES_REQUEST_SUCCEEDED
});

// Set next supplies reset data into store
export const storeNextSuppliesRequestReset = () => ({
    type: STORE_NEXT_SUPPLIES_REQUEST_RESET
});