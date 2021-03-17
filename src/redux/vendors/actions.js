// Reducer action types
export const STORE_SET_VENDORS_DATA = 'STORE_SET_VENDORS_DATA';

// Middleware action types
export const EMIT_ALL_VENDORS_FETCH = 'EMIT_ALL_VENDORS_FETCH';

//====================== Reducer trigger actions
// Set vendors data in store
export const storeSetVendorsData = ({vendors, hasMoreData, page}) => ({
    page,
    vendors,
    hasMoreData,
    type: STORE_SET_VENDORS_DATA
});

//====================== Middleware trigger actions
// Emit all vendors fetch
export const emitAllVendorsFetch = () => ({
    type: EMIT_ALL_VENDORS_FETCH
});