// Reducer action types
export const STORE_SET_REPORTS_DATA = 'STORE_SET_REPORTS_DATA';

// Middleware action types
export const EMIT_REPORTS_FETCH = 'EMIT_REPORTS_FETCH';

//====================== Reducer trigger actions
// Set reports data in store
export const storeSetReportsData = ({reports}) => ({
    reports,
    type: STORE_SET_REPORTS_DATA
});

//====================== Middleware trigger actions
// Emit fetch reports
export const emitReportsFetch = ({selectedDay}) => ({
    selectedDay,
    type: EMIT_REPORTS_FETCH
});