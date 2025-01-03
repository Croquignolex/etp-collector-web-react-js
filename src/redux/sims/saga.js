import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest} from "../../functions/axiosFunctions";
import {
    EMIT_SIMS_FETCH,
    storeSetSimsData,
    EMIT_ALL_SIMS_FETCH,
    EMIT_NEXT_SIMS_FETCH,
    storeSetNextSimsData,
    EMIT_EXTERNAL_SIMS_FETCH,
    EMIT_INTERNAL_SIMS_FETCH,
    EMIT_ALL_MASTER_SIMS_FETCH,
    EMIT_ALL_COLLECTOR_SIMS_FETCH,
    storeStopInfiniteScrollSimData
} from "./actions";
import {
    storeSimsRequestInit,
    storeSimsRequestFailed,
    storeSimsRequestSucceed,
    storeAllSimsRequestInit,
    storeNextSimsRequestInit,
    storeAllSimsRequestFailed,
    storeNextSimsRequestFailed,
    storeAllSimsRequestSucceed,
    storeNextSimsRequestSucceed,
    storeAllMasterSimsRequestInit,
    storeAllExternalSimsRequestInit,
    storeAllMasterSimsRequestFailed,
    storeAllInternalSimsRequestInit,
    storeAllCollectorSimsRequestInit,
    storeAllMasterSimsRequestSucceed,
    storeAllInternalSimsRequestFailed,
    storeAllExternalSimsRequestFailed,
    storeAllCollectorSimsRequestFailed,
    storeAllInternalSimsRequestSucceed,
    storeAllExternalSimsRequestSucceed,
    storeAllCollectorSimsRequestSucceed
} from "../requests/sims/actions";

// Fetch all sims from API
export function* emitAllSimsFetch() {
    yield takeLatest(EMIT_ALL_SIMS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, api.ALL_SIMS_API_PATH);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetSimsData({sims, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllSimsRequestFailed({message}));
        }
    });
}

// Fetch internal sims from API
export function* emitAllInternalSimsFetch() {
    yield takeLatest(EMIT_INTERNAL_SIMS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllInternalSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.ALL_INTERNAL_SIMS_API_PATH}?page=1`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeAllInternalSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllInternalSimsRequestFailed({message}));
        }
    });
}

// Fetch external sims from API
export function* emitAllExternalSimsFetch() {
    yield takeLatest(EMIT_EXTERNAL_SIMS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllExternalSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.ALL_EXTERNAL_SIMS_API_PATH}?page=1`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeAllExternalSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllExternalSimsRequestFailed({message}));
        }
    });
}

// Fetch all master sims from API
export function* emitAllMasterSimsFetch() {
    yield takeLatest(EMIT_ALL_MASTER_SIMS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllMasterSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.ALL_MASTERS_SIMS_API_PATH}?page=1`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeAllMasterSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllMasterSimsRequestFailed({message}));
        }
    });
}

// Fetch sims from API
export function* emitSimsFetch() {
    yield takeLatest(EMIT_SIMS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.SIMS_API_PATH}?page=1`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSimsRequestFailed({message}));
        }
    });
}

// Fetch next sims from API
export function* emitNextSimsFetch() {
    yield takeLatest(EMIT_NEXT_SIMS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.SIMS_API_PATH}?page=${page}`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetNextSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextSimsRequestFailed({message}));
            yield put(storeStopInfiniteScrollSimData());
        }
    });
}

// Fetch all collector sims from API
export function* emitAllCollectorSimsFetch() {
    yield takeLatest(EMIT_ALL_COLLECTOR_SIMS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllCollectorSimsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.ALL_COLLECTOR_SIMS_API_PATH}`);
            // Extract data
            const sims = extractSimsData(apiResponse.data.puces);
            // Fire event to redux
            yield put(storeSetSimsData({sims, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeAllCollectorSimsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllCollectorSimsRequestFailed({message}));
        }
    });
}

// Extract sim data
function extractSimData(apiSim, apiType, apiUser, apiAgent, apiCompany, apiOperator, apiCollector, apiAgency) {
    let sim = {
        id: '', name: '', reference: '', number: '', balance: '', description: '', creation: '',

        type: {id: '', name: ''},
        agent: {id: '', name: ''},
        agency: {id: '', name: ''},
        company: {id: '', name: ''},
        operator: {id: '', name: ''},
        collector: {id: '', name: ''}
    };
    if(apiAgent && apiUser) {
        sim.agent = {
            name: apiUser.name,
            id: apiUser.id.toString()
        };
    }
    if(apiCollector) {
        sim.collector = {
            name: apiCollector.name,
            id: apiCollector.id.toString(),
        };
    }
    if(apiCompany) {
        sim.company = {
            name: apiCompany.nom,
            id: apiCompany.id.toString()
        };
    }
    if(apiOperator) {
        sim.operator = {
            name: apiOperator.nom,
            id: apiOperator.id.toString()
        };
    }
    if(apiType) {
        sim.type = {
            name: apiType.name,
            id: apiType.id.toString()
        };
    }
    if(apiAgency) {
        sim.agency = {
            name: apiAgency.name,
            id: apiAgency.id.toString()
        };
    }
    if(apiSim) {
        sim.name = apiSim.nom;
        sim.actionLoader = false;
        sim.number = apiSim.numero;
        sim.balance = apiSim.solde;
        sim.id = apiSim.id.toString();
        sim.creation = apiSim.created_at;
        sim.reference = apiSim.reference;
        sim.description = apiSim.description;
    }
    return sim;
}

// Extract sims data
function extractSimsData(apiSims) {
    const sims = [];
    apiSims.forEach(data => {
        sims.push(extractSimData(
            data.puce,
            data.type,
            data.user,
            data.agent,
            data.corporate,
            data.flote,
            data.recouvreur,
            data.agency
        ))
    });
    return sims;
}

// Combine to export all functions at once
export default function* sagaSims() {
    yield all([
        fork(emitSimsFetch),
        fork(emitAllSimsFetch),
        fork(emitNextSimsFetch),
        fork(emitAllMasterSimsFetch),
        fork(emitAllInternalSimsFetch),
        fork(emitAllExternalSimsFetch),
        fork(emitAllCollectorSimsFetch),
    ]);
}
