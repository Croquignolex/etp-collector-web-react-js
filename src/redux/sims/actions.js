// Reducer action types
export const STORE_SET_SIMS_DATA = 'STORE_SET_SIMS_DATA';
export const STORE_SET_NEXT_SIMS_DATA = 'STORE_SET_NEXT_SIMS_DATA';
export const STORE_STOP_INFINITE_SCROLL_SIMS_DATA = 'STORE_STOP_INFINITE_SCROLL_SIMS_DATA';

// Middleware action types
export const EMIT_SIMS_FETCH = 'EMIT_SIMS_FETCH';
export const EMIT_ALL_SIMS_FETCH = 'EMIT_ALL_SIMS_FETCH';
export const EMIT_NEXT_SIMS_FETCH = 'EMIT_NEXT_SIMS_FETCH';
export const EMIT_INTERNAL_SIMS_FETCH = 'EMIT_INTERNAL_SIMS_FETCH';
export const EMIT_EXTERNAL_SIMS_FETCH = 'EMIT_EXTERNAL_SIMS_FETCH';
export const EMIT_ALL_MASTER_SIMS_FETCH = 'EMIT_ALL_MASTER_SIMS_FETCH';
export const EMIT_ALL_COLLECTOR_SIMS_FETCH = 'EMIT_ALL_COLLECTOR_SIMS_FETCH';

//====================== Reducer trigger actions
// Set sims data in store
export const storeSetSimsData = ({sims, hasMoreData, page}) => ({
    page,
    sims,
    hasMoreData,
    type: STORE_SET_SIMS_DATA
});

// Set next sims data in store
export const storeSetNextSimsData = ({sims, hasMoreData, page}) => ({
    page,
    sims,
    hasMoreData,
    type: STORE_SET_NEXT_SIMS_DATA
});

// Stop infinite scroll
export const storeStopInfiniteScrollSimData = () => ({
    type: STORE_STOP_INFINITE_SCROLL_SIMS_DATA
});

//====================== Middleware trigger actions
// Emit sims fetch
export const emitSimsFetch = () => ({
    type: EMIT_SIMS_FETCH
});

// Emit next sims fetch
export const emitNextSimsFetch = ({page}) => ({
    page,
    type: EMIT_NEXT_SIMS_FETCH
});

// Emit all sims fetch
export const emitAllSimsFetch = () => ({
    type: EMIT_ALL_SIMS_FETCH
});

// Emit all collector sims fetch
export const emitAllCollectorSimsFetch = () => ({
    type: EMIT_ALL_COLLECTOR_SIMS_FETCH
});

// Emit all master sims fetch
export const emitAllMasterSimsFetch = () => ({
    type: EMIT_ALL_MASTER_SIMS_FETCH
});

// Emit all internal sims fetch
export const emitAllInternalSimsFetch = () => ({
    type: EMIT_INTERNAL_SIMS_FETCH
});

// Emit all external sims fetch
export const emitAllExternalSimsFetch = () => ({
    type: EMIT_EXTERNAL_SIMS_FETCH
});