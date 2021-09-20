// Reducer action types
export const STORE_REPORTS_REQUEST_INIT = 'STORE_REPORTS_REQUEST_INIT';
export const STORE_REPORTS_REQUEST_RESET = 'STORE_REPORTS_REQUEST_RESET';
export const STORE_REPORTS_REQUEST_FAILED = 'STORE_REPORTS_REQUEST_FAILED';
export const STORE_REPORTS_REQUEST_SUCCEEDED = 'STORE_REPORTS_REQUEST_SUCCEEDED';

// ======================================================== Reports
// Set reports init data into store
export const storeReportsRequestInit = () => ({
    type: STORE_REPORTS_REQUEST_INIT
});

// Set reports failed data into store
export const storeReportsRequestFailed = ({message}) => ({
    message,
    type: STORE_REPORTS_REQUEST_FAILED
});

// Set reports succeeded data into store
export const storeReportsRequestSucceed = ({message}) => ({
    message,
    type: STORE_REPORTS_REQUEST_SUCCEEDED
});

// Set reports reset data into store
export const storeReportsRequestReset = () => ({
    type: STORE_REPORTS_REQUEST_RESET
});