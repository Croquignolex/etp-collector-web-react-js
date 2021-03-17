// Reducer action types
export const STORE_LIQUIDITIES_REQUEST_INIT = 'STORE_LIQUIDITIES_REQUEST_INIT';
export const STORE_LIQUIDITIES_REQUEST_RESET = 'STORE_LIQUIDITIES_REQUEST_RESET';
export const STORE_LIQUIDITIES_REQUEST_FAILED = 'STORE_LIQUIDITIES_REQUEST_FAILED';
export const STORE_LIQUIDITIES_REQUEST_SUCCEEDED = 'STORE_LIQUIDITIES_REQUEST_SUCCEEDED';

export const STORE_NEXT_LIQUIDITIES_REQUEST_INIT = 'STORE_NEXT_LIQUIDITIES_REQUEST_INIT';
export const STORE_NEXT_LIQUIDITIES_REQUEST_RESET = 'STORE_NEXT_LIQUIDITIES_REQUEST_RESET';
export const STORE_NEXT_LIQUIDITIES_REQUEST_FAILED = 'STORE_NEXT_LIQUIDITIES_REQUEST_FAILED';
export const STORE_NEXT_LIQUIDITIES_REQUEST_SUCCEEDED = 'STORE_NEXT_LIQUIDITIES_REQUEST_SUCCEEDED';

export const STORE_ADD_LIQUIDITY_REQUEST_INIT = 'STORE_ADD_LIQUIDITY_REQUEST_INIT';
export const STORE_ADD_LIQUIDITY_REQUEST_RESET = 'STORE_ADD_LIQUIDITY_REQUEST_RESET';
export const STORE_ADD_LIQUIDITY_REQUEST_FAILED = 'STORE_ADD_LIQUIDITY_REQUEST_FAILED';
export const STORE_ADD_LIQUIDITY_REQUEST_SUCCEEDED = 'STORE_ADD_LIQUIDITY_REQUEST_SUCCEEDED';

// ======================================================== Liquidities
// Set liquidities init data into store
export const storeLiquiditiesRequestInit = () => ({
    type: STORE_LIQUIDITIES_REQUEST_INIT
});

// Set liquidities failed data into store
export const storeLiquiditiesRequestFailed = ({message}) => ({
    message,
    type: STORE_LIQUIDITIES_REQUEST_FAILED
});

// Set liquidities succeeded data into store
export const storeLiquiditiesRequestSucceed = ({message}) => ({
    message,
    type: STORE_LIQUIDITIES_REQUEST_SUCCEEDED
});

// Set liquidities reset data into store
export const storeLiquiditiesRequestReset = () => ({
    type: STORE_LIQUIDITIES_REQUEST_RESET
});
// ======================================================== Next liquidities
// Set next liquidities init data into store
export const storeNextLiquiditiesRequestInit = () => ({
    type: STORE_NEXT_LIQUIDITIES_REQUEST_INIT
});

// Set next liquidities failed data into store
export const storeNextLiquiditiesRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_LIQUIDITIES_REQUEST_FAILED
});

// Set next liquidities succeeded data into store
export const storeNextLiquiditiesRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_LIQUIDITIES_REQUEST_SUCCEEDED
});

// Set next liquidates reset data into store
export const storeNextLiquiditiesRequestReset = () => ({
    type: STORE_NEXT_LIQUIDITIES_REQUEST_RESET
});
// ======================================================== Add liquidity
// Set add liquidity init data into store
export const storeAddLiquidityRequestInit = () => ({
    type: STORE_ADD_LIQUIDITY_REQUEST_INIT
});

// Set add liquidity failed data into store
export const storeAddLiquidityRequestFailed = ({message}) => ({
    message,
    type: STORE_ADD_LIQUIDITY_REQUEST_FAILED
});

// Set add liquidity succeeded data into store
export const storeAddLiquidityRequestSucceed = ({message}) => ({
    message,
    type: STORE_ADD_LIQUIDITY_REQUEST_SUCCEEDED
});

// Set add liquidity reset data into store
export const storeAddLiquidityRequestReset = () => ({
    type: STORE_ADD_LIQUIDITY_REQUEST_RESET
});