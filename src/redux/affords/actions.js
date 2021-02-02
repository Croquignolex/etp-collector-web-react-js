// Reducer action types
export const STORE_SET_AFFORDS_DATA = 'STORE_SET_AFFORDS_DATA';
export const STORE_SET_NEW_AFFORD_DATA = 'STORE_SET_NEW_AFFORD_DATA';
export const STORE_SET_NEXT_AFFORDS_DATA = 'STORE_SET_NEXT_AFFORDS_DATA';
export const STORE_STOP_INFINITE_SCROLL_AFFORD_DATA = 'STORE_STOP_INFINITE_SCROLL_AFFORD_DATA';

// Middleware action types
export const EMIT_ADD_AFFORD = 'EMIT_ADD_AFFORD';
export const EMIT_AFFORDS_FETCH = 'EMIT_AFFORDS_FETCH';
export const EMIT_NEXT_AFFORDS_FETCH = 'EMIT_NEXT_AFFORDS_FETCH';

//====================== Reducer trigger actions
// Set affords data in store
export const storeSetAffordsData = ({affords, hasMoreData, page}) => ({
    page,
    affords,
    hasMoreData,
    type: STORE_SET_AFFORDS_DATA
});

// Set new afford data in store
export const storeSetNewAffordData = ({afford}) => ({
    afford,
    type: STORE_SET_NEW_AFFORD_DATA
});
 
// Set next affords data in store
export const storeSetNextAffordsData = ({affords, hasMoreData, page}) => ({
    page,
    affords,
    hasMoreData,
    type: STORE_SET_NEXT_AFFORDS_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollAffordData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_AFFORD_DATA
});

//====================== Middleware trigger actions
// Emit affords fetch
export const emitAffordsFetch = () => ({
    type: EMIT_AFFORDS_FETCH
});

// Emit next affords fetch
export const emitNextAffordsFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_AFFORDS_FETCH
});

// Emit add afford
export const emitAddAfford = ({vendor, amount, sim, receipt}) => ({
    sim,
    vendor,
    amount,
    receipt,
    type: EMIT_ADD_AFFORD
});
