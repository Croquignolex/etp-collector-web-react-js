// Reducer action types
export const STORE_ALL_VENDORS_REQUEST_INIT = 'STORE_ALL_VENDORS_REQUEST_INIT';
export const STORE_ALL_VENDORS_REQUEST_RESET = 'STORE_ALL_VENDORS_REQUEST_RESET';
export const STORE_ALL_VENDORS_REQUEST_FAILED = 'STORE_ALL_VENDORS_REQUEST_FAILED';
export const STORE_ALL_VENDORS_REQUEST_SUCCEEDED = 'STORE_ALL_VENDORS_REQUEST_SUCCEEDED';

// ======================================================== All vendors
// Set all vendors init data into store
export const storeAllVendorsRequestInit = () => ({
    type: STORE_ALL_VENDORS_REQUEST_INIT
});

// Set all vendors failed data into store
export const storeAllVendorsRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_VENDORS_REQUEST_FAILED
});

// Set all vendors succeeded data into store
export const storeAllVendorsRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_VENDORS_REQUEST_SUCCEEDED
});

// Set all vendors reset data into store
export const storeAllVendorsRequestReset = () => ({
    type: STORE_ALL_VENDORS_REQUEST_RESET
});