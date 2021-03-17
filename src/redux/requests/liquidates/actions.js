// Reducer action types
export const STORE_LIQUIDATES_REQUEST_INIT = 'STORE_LIQUIDATES_REQUEST_INIT';
export const STORE_LIQUIDATES_REQUEST_RESET = 'STORE_LIQUIDATES_REQUEST_RESET';
export const STORE_LIQUIDATES_REQUEST_FAILED = 'STORE_LIQUIDATES_REQUEST_FAILED';
export const STORE_LIQUIDATES_REQUEST_SUCCEEDED = 'STORE_LIQUIDATES_REQUEST_SUCCEEDED';

export const STORE_NEXT_LIQUIDATES_REQUEST_INIT = 'STORE_NEXT_LIQUIDATES_REQUEST_INIT';
export const STORE_NEXT_LIQUIDATES_REQUEST_RESET = 'STORE_NEXT_LIQUIDATES_REQUEST_RESET';
export const STORE_NEXT_LIQUIDATES_REQUEST_FAILED = 'STORE_NEXT_LIQUIDATES_REQUEST_FAILED';
export const STORE_NEXT_LIQUIDATES_REQUEST_SUCCEEDED = 'STORE_NEXT_LIQUIDATES_REQUEST_SUCCEEDED';

export const STORE_ADD_LIQUIDATE_REQUEST_INIT = 'STORE_ADD_LIQUIDATE_REQUEST_INIT';
export const STORE_ADD_LIQUIDATE_REQUEST_RESET = 'STORE_ADD_LIQUIDATE_REQUEST_RESET';
export const STORE_ADD_LIQUIDATE_REQUEST_FAILED = 'STORE_ADD_LIQUIDATE_REQUEST_FAILED';
export const STORE_ADD_LIQUIDATE_REQUEST_SUCCEEDED = 'STORE_ADD_LIQUIDATE_REQUEST_SUCCEEDED';

// ======================================================== Liquidates
// Set liquidates init data into store
export const storeLiquidatesRequestInit = () => ({
    type: STORE_LIQUIDATES_REQUEST_INIT
});

// Set liquidates failed data into store
export const storeLiquidatesRequestFailed = ({message}) => ({
    message,
    type: STORE_LIQUIDATES_REQUEST_FAILED
});

// Set liquidates succeeded data into store
export const storeLiquidatesRequestSucceed = ({message}) => ({
    message,
    type: STORE_LIQUIDATES_REQUEST_SUCCEEDED
});

// Set liquidates reset data into store
export const storeLiquidatesRequestReset = () => ({
    type: STORE_LIQUIDATES_REQUEST_RESET
});
// ======================================================== Next liquidates
// Set next liquidates init data into store
export const storeNextLiquidatesRequestInit = () => ({
    type: STORE_NEXT_LIQUIDATES_REQUEST_INIT
});

// Set next liquidates failed data into store
export const storeNextLiquidatesRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_LIQUIDATES_REQUEST_FAILED
});

// Set next liquidates succeeded data into store
export const storeNextLiquidatesRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_LIQUIDATES_REQUEST_SUCCEEDED
});

// Set next liquidates reset data into store
export const storeNextLiquidatesRequestReset = () => ({
    type: STORE_NEXT_LIQUIDATES_REQUEST_RESET
});
// ======================================================== Add liquidate
// Set add liquidate init data into store
export const storeAddLiquidateRequestInit = () => ({
    type: STORE_ADD_LIQUIDATE_REQUEST_INIT
});

// Set add liquidate failed data into store
export const storeAddLiquidateRequestFailed = ({message}) => ({
    message,
    type: STORE_ADD_LIQUIDATE_REQUEST_FAILED
});

// Set add liquidate succeeded data into store
export const storeAddLiquidateRequestSucceed = ({message}) => ({
    message,
    type: STORE_ADD_LIQUIDATE_REQUEST_SUCCEEDED
});

// Set add liquidate reset data into store
export const storeAddLiquidateRequestReset = () => ({
    type: STORE_ADD_LIQUIDATE_REQUEST_RESET
});