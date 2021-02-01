// Reducer action types
export const STORE_SET_SIMS_DATA = 'STORE_SET_SIMS_DATA';

// Middleware action types
export const EMIT_ALL_SIMS_FETCH = 'EMIT_ALL_SIMS_FETCH';

//====================== Reducer trigger actions
// Set sims data in store
export const storeSetSimsData = ({sims, hasMoreData, page}) => ({
    page,
    sims,
    hasMoreData,
    type: STORE_SET_SIMS_DATA
});

//====================== Middleware trigger actions
// Emit all sims fetch
export const emitAllSimsFetch = () => ({
    type: EMIT_ALL_SIMS_FETCH
});