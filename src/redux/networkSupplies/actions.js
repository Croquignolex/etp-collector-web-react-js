// Reducer action types
export const STORE_SET_NETWORK_SUPPLIES_DATA = 'STORE_SET_NETWORK_SUPPLIES_DATA'; 
export const STORE_SET_NEW_NETWORK_SUPPLY_DATA = 'STORE_SET_NEW_NETWORK_SUPPLY_DATA';
export const STORE_SET_NEXT_NETWORK_SUPPLIES_DATA = 'STORE_SET_NEXT_NETWORK_SUPPLIES_DATA';
export const STORE_STOP_INFINITE_SCROLL_NETWORK_SUPPLY_DATA = 'STORE_STOP_INFINITE_SCROLL_NETWORK_SUPPLY_DATA';

// Middleware action types
export const EMIT_ADD_NETWORK_SUPPLY = 'EMIT_ADD_NETWORK_SUPPLY';
export const EMIT_NETWORK_SUPPLIES_FETCH = 'EMIT_NETWORK_SUPPLIES_FETCH';
export const EMIT_NEXT_NETWORK_SUPPLIES_FETCH = 'EMIT_NEXT_NETWORK_SUPPLIES_FETCH';

//====================== Reducer trigger actions
// Set network supplies data in store
export const storeSetNetworkSuppliesData = ({networkSupplies, hasMoreData, page}) => ({
    page,
    hasMoreData,
    networkSupplies,
    type: STORE_SET_NETWORK_SUPPLIES_DATA
});

// Set new network supply data in store
export const storeSetNewNetworkSupplyData = ({networkSupply}) => ({
    networkSupply,
    type: STORE_SET_NEW_NETWORK_SUPPLY_DATA
});

// Set next network supplies data in store
export const storeSetNextNetworkSuppliesData = ({networkSupplies, hasMoreData, page}) => ({
    page,
    hasMoreData,
    networkSupplies,
    type: STORE_SET_NEXT_NETWORK_SUPPLIES_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollNetworkSupplyData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_NETWORK_SUPPLY_DATA
});

//====================== Middleware trigger actions
// Emit network supplies fetch
export const emitNetworkSuppliesFetch = () => ({
    type: EMIT_NETWORK_SUPPLIES_FETCH
});

// Emit next network supplies fetch
export const emitNextNetworkSuppliesFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_NETWORK_SUPPLIES_FETCH
});

// Emit add network supply
export const emitAddNetworkSupply = ({amount, collectorSim, agentSim, agent}) => ({
    agent,
    amount,
    agentSim,
    collectorSim,
    type: EMIT_ADD_NETWORK_SUPPLY
});
