// Reducer action types
export const STORE_SIMS_REQUEST_INIT = 'STORE_SIMS_REQUEST_INIT';
export const STORE_SIMS_REQUEST_RESET = 'STORE_SIMS_REQUEST_RESET';
export const STORE_SIMS_REQUEST_FAILED = 'STORE_SIMS_REQUEST_FAILED';
export const STORE_SIMS_REQUEST_SUCCEEDED = 'STORE_SIMS_REQUEST_SUCCEEDED';

export const STORE_NEXT_SIMS_REQUEST_INIT = 'STORE_NEXT_SIMS_REQUEST_INIT';
export const STORE_NEXT_SIMS_REQUEST_RESET = 'STORE_NEXT_SIMS_REQUEST_RESET';
export const STORE_NEXT_SIMS_REQUEST_FAILED = 'STORE_NEXT_SIMS_REQUEST_FAILED';
export const STORE_NEXT_SIMS_REQUEST_SUCCEEDED = 'STORE_NEXT_SIMS_REQUEST_SUCCEEDED';

export const STORE_ALL_SIMS_REQUEST_INIT = 'STORE_ALL_SIMS_REQUEST_INIT';
export const STORE_ALL_SIMS_REQUEST_RESET = 'STORE_ALL_SIMS_REQUEST_RESET';
export const STORE_ALL_SIMS_REQUEST_FAILED = 'STORE_ALL_SIMS_REQUEST_FAILED';
export const STORE_ALL_SIMS_REQUEST_SUCCEEDED = 'STORE_ALL_SIMS_REQUEST_SUCCEEDED';

export const STORE_ALL_COLLECTOR_SIMS_REQUEST_INIT = 'STORE_ALL_COLLECTOR_SIMS_REQUEST_INIT';
export const STORE_ALL_COLLECTOR_SIMS_REQUEST_RESET = 'STORE_ALL_COLLECTOR_SIMS_REQUEST_RESET';
export const STORE_ALL_COLLECTOR_SIMS_REQUEST_FAILED = 'STORE_ALL_COLLECTOR_SIMS_REQUEST_FAILED';
export const STORE_ALL_COLLECTOR_SIMS_REQUEST_SUCCEEDED = 'STORE_ALL_COLLECTOR_SIMS_REQUEST_SUCCEEDED';

export const STORE_ALL_MASTER_SIMS_REQUEST_INIT = 'STORE_ALL_MASTER_SIMS_REQUEST_INIT';
export const STORE_ALL_MASTER_SIMS_REQUEST_RESET = 'STORE_ALL_MASTER_SIMS_REQUEST_RESET';
export const STORE_ALL_MASTER_SIMS_REQUEST_FAILED = 'STORE_ALL_MASTER_SIMS_REQUEST_FAILED';
export const STORE_ALL_MASTER_SIMS_REQUEST_SUCCEEDED = 'STORE_ALL_MASTER_SIMS_REQUEST_SUCCEEDED';

export const STORE_ALL_INTERNAL_SIMS_REQUEST_INIT = 'STORE_ALL_INTERNAL_SIMS_REQUEST_INIT';
export const STORE_ALL_INTERNAL_SIMS_REQUEST_RESET = 'STORE_ALL_INTERNAL_SIMS_REQUEST_RESET';
export const STORE_ALL_INTERNAL_SIMS_REQUEST_FAILED = 'STORE_ALL_INTERNAL_SIMS_REQUEST_FAILED';
export const STORE_ALL_INTERNAL_SIMS_REQUEST_SUCCEEDED = 'STORE_ALL_INTERNAL_SIMS_REQUEST_SUCCEEDED';

export const STORE_ALL_EXTERNAL_SIMS_REQUEST_INIT = 'STORE_ALL_EXTERNAL_SIMS_REQUEST_INIT';
export const STORE_ALL_EXTERNAL_SIMS_REQUEST_RESET = 'STORE_ALL_EXTERNAL_SIMS_REQUEST_RESET';
export const STORE_ALL_EXTERNAL_SIMS_REQUEST_FAILED = 'STORE_ALL_EXTERNAL_SIMS_REQUEST_FAILED';
export const STORE_ALL_EXTERNAL_SIMS_REQUEST_SUCCEEDED = 'STORE_ALL_EXTERNAL_SIMS_REQUEST_SUCCEEDED';

// ======================================================== Sims
// Set sims init data into store
export const storeSimsRequestInit = () => ({
    type: STORE_SIMS_REQUEST_INIT
});

// Set sims failed data into store
export const storeSimsRequestFailed = ({message}) => ({
    message,
    type: STORE_SIMS_REQUEST_FAILED
});

// Set sims succeeded data into store
export const storeSimsRequestSucceed = ({message}) => ({
    message,
    type: STORE_SIMS_REQUEST_SUCCEEDED
});

// Set sims reset data into store
export const storeSimsRequestReset = () => ({
    type: STORE_SIMS_REQUEST_RESET
});
// ======================================================== Next sims
// Set next sims init data into store
export const storeNextSimsRequestInit = () => ({
    type: STORE_NEXT_SIMS_REQUEST_INIT
});

// Set next sims failed data into store
export const storeNextSimsRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_SIMS_REQUEST_FAILED
});

// Set next sims succeeded data into store
export const storeNextSimsRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_SIMS_REQUEST_SUCCEEDED
});

// Set next sims reset data into store
export const storeNextSimsRequestReset = () => ({
    type: STORE_NEXT_SIMS_REQUEST_RESET
});
// ======================================================== All sims
// Set all sims init data into store
export const storeAllSimsRequestInit = () => ({
    type: STORE_ALL_SIMS_REQUEST_INIT
});

// Set all sims failed data into store
export const storeAllSimsRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_SIMS_REQUEST_FAILED
});

// Set all sims succeeded data into store
export const storeAllSimsRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_SIMS_REQUEST_SUCCEEDED
});

// Set all sims reset data into store
export const storeAllSimsRequestReset = () => ({
    type: STORE_ALL_SIMS_REQUEST_RESET
});
// ======================================================== All collector sims
// Set all collector sims init data into store
export const storeAllCollectorSimsRequestInit = () => ({
    type: STORE_ALL_COLLECTOR_SIMS_REQUEST_INIT
});

// Set all collector sims failed data into store
export const storeAllCollectorSimsRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_COLLECTOR_SIMS_REQUEST_FAILED
});

// Set all collector sims succeeded data into store
export const storeAllCollectorSimsRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_COLLECTOR_SIMS_REQUEST_SUCCEEDED
});

// Set all collector sims reset data into store
export const storeAllCollectorSimsRequestReset = () => ({
    type: STORE_ALL_COLLECTOR_SIMS_REQUEST_RESET
});
// ======================================================== All internals sims
// Set all internals sims init data into store
export const storeAllInternalSimsRequestInit = () => ({
    type: STORE_ALL_INTERNAL_SIMS_REQUEST_INIT
});

// Set all internals sims failed data into store
export const storeAllInternalSimsRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_INTERNAL_SIMS_REQUEST_FAILED
});

// Set all internals sims succeeded data into store
export const storeAllInternalSimsRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_INTERNAL_SIMS_REQUEST_SUCCEEDED
});

// Set all internals sims reset data into store
export const storeAllInternalSimsRequestReset = () => ({
    type: STORE_ALL_INTERNAL_SIMS_REQUEST_RESET
});
// ======================================================== All external sims
// Set all external sims init data into store
export const storeAllExternalSimsRequestInit = () => ({
    type: STORE_ALL_EXTERNAL_SIMS_REQUEST_INIT
});

// Set all external sims failed data into store
export const storeAllExternalSimsRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_EXTERNAL_SIMS_REQUEST_FAILED
});

// Set all external sims succeeded data into store
export const storeAllExternalSimsRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_EXTERNAL_SIMS_REQUEST_SUCCEEDED
});

// Set all external sims reset data into store
export const storeAllExternalSimsRequestReset = () => ({
    type: STORE_ALL_EXTERNAL_SIMS_REQUEST_RESET
});
// ======================================================== All master sims
// Set all master sims init data into store
export const storeAllMasterSimsRequestInit = () => ({
    type: STORE_ALL_MASTER_SIMS_REQUEST_INIT
});

// Set all master sims failed data into store
export const storeAllMasterSimsRequestFailed = ({message}) => ({
    message,
    type: STORE_ALL_MASTER_SIMS_REQUEST_FAILED
});

// Set all master sims succeeded data into store
export const storeAllMasterSimsRequestSucceed = ({message}) => ({
    message,
    type: STORE_ALL_MASTER_SIMS_REQUEST_SUCCEEDED
});

// Set all master sims reset data into store
export const storeAllMasterSimsRequestReset = () => ({
    type: STORE_ALL_MASTER_SIMS_REQUEST_RESET
});