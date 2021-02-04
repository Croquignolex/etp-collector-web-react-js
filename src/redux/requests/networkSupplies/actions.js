// Reducer action types
export const STORE_NETWORK_SUPPLIES_REQUEST_INIT = 'STORE_NETWORK_SUPPLIES_REQUEST_INIT';
export const STORE_NETWORK_SUPPLIES_REQUEST_RESET = 'STORE_NETWORK_SUPPLIES_REQUEST_RESET';
export const STORE_NETWORK_SUPPLIES_REQUEST_FAILED = 'STORE_NETWORK_SUPPLIES_REQUEST_FAILED';
export const STORE_NETWORK_SUPPLIES_REQUEST_SUCCEEDED = 'STORE_NETWORK_SUPPLIES_REQUEST_SUCCEEDED';

export const STORE_NEXT_NETWORK_SUPPLIES_REQUEST_INIT = 'STORE_NEXT_NETWORK_SUPPLIES_REQUEST_INIT';
export const STORE_NEXT_NETWORK_SUPPLIES_REQUEST_RESET = 'STORE_NEXT_NETWORK_SUPPLIES_REQUEST_RESET';
export const STORE_NEXT_NETWORK_SUPPLIES_REQUEST_FAILED = 'STORE_NEXT_NETWORK_SUPPLIES_REQUEST_FAILED';
export const STORE_NEXT_NETWORK_SUPPLIES_REQUEST_SUCCEEDED = 'STORE_NEXT_NETWORK_SUPPLIES_REQUEST_SUCCEEDED';

export const STORE_ADD_NETWORK_SUPPLY_REQUEST_INIT = 'STORE_ADD_NETWORK_SUPPLY_REQUEST_INIT';
export const STORE_ADD_NETWORK_SUPPLY_REQUEST_RESET = 'STORE_ADD_NETWORK_SUPPLY_REQUEST_RESET';
export const STORE_ADD_NETWORK_SUPPLY_REQUEST_FAILED = 'STORE_ADD_NETWORK_SUPPLY_REQUEST_FAILED';
export const STORE_ADD_NETWORK_SUPPLY_REQUEST_SUCCEEDED = 'STORE_ADD_NETWORK_SUPPLY_REQUEST_SUCCEEDED';

// ======================================================== Network supplies
// Set network supplies init data into store
export const storeNetworkSuppliesRequestInit = () => ({
    type: STORE_NETWORK_SUPPLIES_REQUEST_INIT
});

// Set network supplies failed data into store
export const storeNetworkSuppliesRequestFailed = ({message}) => ({
    message,
    type: STORE_NETWORK_SUPPLIES_REQUEST_FAILED
});

// Set network supplies succeeded data into store
export const storeNetworkSuppliesRequestSucceed = ({message}) => ({
    message,
    type: STORE_NETWORK_SUPPLIES_REQUEST_SUCCEEDED
});

// Set network supplies reset data into store
export const storeNetworkSuppliesRequestReset = () => ({
    type: STORE_NETWORK_SUPPLIES_REQUEST_RESET
});
// ======================================================== Next network supplies
// Set next network supplies init data into store
export const storeNextNetworkSuppliesRequestInit = () => ({
    type: STORE_NEXT_NETWORK_SUPPLIES_REQUEST_INIT
});

// Set next network supplies failed data into store
export const storeNextNetworkSuppliesRequestFailed = ({message}) => ({
    message,
    type: STORE_NEXT_NETWORK_SUPPLIES_REQUEST_FAILED
});

// Set next network supplies succeeded data into store
export const storeNextNetworkSuppliesRequestSucceed = ({message}) => ({
    message,
    type: STORE_NEXT_NETWORK_SUPPLIES_REQUEST_SUCCEEDED
});

// Set next network supplies reset data into store
export const storeNextNetworkSuppliesRequestReset = () => ({
    type: STORE_NEXT_NETWORK_SUPPLIES_REQUEST_RESET
});
// ======================================================== Add network supply
// Set add network supply init data into store
export const storeAddNetworkSupplyRequestInit = () => ({
    type: STORE_ADD_NETWORK_SUPPLY_REQUEST_INIT
});

// Set add network supply failed data into store
export const storeAddNetworkSupplyRequestFailed = ({message}) => ({
    message,
    type: STORE_ADD_NETWORK_SUPPLY_REQUEST_FAILED
});

// Set add network supply succeeded data into store
export const storeAddNetworkSupplyRequestSucceed = ({message}) => ({
    message,
    type: STORE_ADD_NETWORK_SUPPLY_REQUEST_SUCCEEDED
});

// Set add network supply reset data into store
export const storeAddNetworkSupplyRequestReset = () => ({
    type: STORE_ADD_NETWORK_SUPPLY_REQUEST_RESET
});
