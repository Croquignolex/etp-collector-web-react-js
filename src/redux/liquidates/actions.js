// Reducer action types
export const STORE_SET_LIQUIDATES_DATA = 'STORE_SET_LIQUIDATES_DATA';
export const STORE_SET_NEW_LIQUIDATE_DATA = 'STORE_SET_NEW_LIQUIDATE_DATA';
export const STORE_SET_NEXT_LIQUIDATES_DATA = 'STORE_SET_NEXT_LIQUIDATES_DATA';
export const STORE_STOP_INFINITE_SCROLL_LIQUIDATE_DATA = 'STORE_STOP_INFINITE_SCROLL_LIQUIDATE_DATA';

// Middleware action types
export const EMIT_ADD_LIQUIDATE = 'EMIT_ADD_LIQUIDATE';
export const EMIT_LIQUIDATES_FETCH = 'EMIT_LIQUIDATES_FETCH';
export const EMIT_NEXT_LIQUIDATES_FETCH = 'EMIT_NEXT_LIQUIDATES_FETCH';

//====================== Reducer trigger actions
// Set liquidates data in store
export const storeSetLiquidatesData = ({liquidates, hasMoreData, page}) => ({
    page,
    liquidates,
    hasMoreData,
    type: STORE_SET_LIQUIDATES_DATA
});

// Set new liquidate data in store
export const storeSetNewLiquidateData = ({liquidate}) => ({
    liquidate,
    type: STORE_SET_NEW_LIQUIDATE_DATA
});

// Set next liquidates data in store
export const storeSetNextLiquidatesData = ({liquidates, hasMoreData, page}) => ({
    page,
    liquidates,
    hasMoreData,
    type: STORE_SET_NEXT_LIQUIDATES_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollLiquidateData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_LIQUIDATE_DATA
});

//====================== Middleware trigger actions
// Emit liquidates fetch
export const emitLiquidatesFetch = () => ({
    type: EMIT_LIQUIDATES_FETCH
});

// Emit next liquidates fetch
export const emitNextLiquidatesFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_LIQUIDATES_FETCH
});

// Emit add liquidate
export const emitAddLiquidate = ({amount, collector}) => ({
    amount,
    collector,
    type: EMIT_ADD_LIQUIDATE
});
