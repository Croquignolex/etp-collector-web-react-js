import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {
    EMIT_ADD_LIQUIDATE,
    EMIT_LIQUIDATES_FETCH,
    storeSetLiquidatesData,
    storeSetNewLiquidateData,
    EMIT_NEXT_LIQUIDATES_FETCH,
    storeSetNextLiquidatesData,
    storeStopInfiniteScrollLiquidateData
} from "./actions";
import {
    storeLiquidatesRequestInit,
    storeLiquidatesRequestFailed,
    storeAddLiquidateRequestInit,
    storeLiquidatesRequestSucceed,
    storeAddLiquidateRequestFailed,
    storeNextLiquidatesRequestInit,
    storeAddLiquidateRequestSucceed,
    storeNextLiquidatesRequestFailed,
    storeNextLiquidatesRequestSucceed
} from "../requests/liquidates/actions";

// Fetch liquidates from API
export function* emitLiquidatesFetch() {
    yield takeLatest(EMIT_LIQUIDATES_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeLiquidatesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.LIQUIDATES_API_PATH}?page=1`);
            // Extract data
            const liquidates = extractLiquidatesData(apiResponse.data.liqudites);
            // Fire event to redux
            yield put(storeSetLiquidatesData({liquidates, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeLiquidatesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeLiquidatesRequestFailed({message}));
        }
    });
}

// Fetch next liquidates from API
export function* emitNextLiquidatesFetch() {
    yield takeLatest(EMIT_NEXT_LIQUIDATES_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextLiquidatesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.LIQUIDATES_API_PATH}?page=${page}`);
            // Extract data
            const liquidates = extractLiquidatesData(apiResponse.data.liqudites);
            // Fire event to redux
            yield put(storeSetNextLiquidatesData({liquidates, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextLiquidatesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextLiquidatesRequestFailed({message}));
            yield put(storeStopInfiniteScrollLiquidateData());
        }
    });
}

// New liquidate from API
export function* emitAddLiquidate() {
    yield takeLatest(EMIT_ADD_LIQUIDATE, function*({amount, managerSim, collectorSim}) {
        try {
            // Fire event for request
            yield put(storeAddLiquidateRequestInit());
            const data = {montant: amount, id_puce_to: collectorSim, id_puce_from: managerSim};
            const apiResponse = yield call(apiPostRequest, api.NEW_LIQUIDATES_API_PATH, data);
            // Extract data
            const liquidate = extractLiquidateData(
                apiResponse.data.puce_emetrice,
                apiResponse.data.puce_receptrice,
                apiResponse.data.utilisateur,
                apiResponse.data.flottage,
            );
            // Fire event to redux
            yield put(storeSetNewLiquidateData({liquidate}))
            // Fire event for request
            yield put(storeAddLiquidateRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddLiquidateRequestFailed({message}));
        }
    });
}

// Extract liquidate data
function extractLiquidateData(apiSimOutgoing, apiSimIncoming, apiUser, apiLiquidate) {
    let liquidate = {
        id: '', reference: '', amount: '', creation: '',
        note: '', remaining: '', status: '',

        user: {id: '', name: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},
    };
    if(apiSimOutgoing) {
        liquidate.sim_outgoing = {
            name: apiSimOutgoing.nom,
            number: apiSimOutgoing.numero,
            id: apiSimOutgoing.id.toString()
        };
    }
    if(apiSimIncoming) {
        liquidate.sim_incoming = {
            name: apiSimIncoming.nom,
            number: apiSimIncoming.numero,
            id: apiSimIncoming.id.toString()
        };
    }
    if(apiUser) {
        liquidate.user = {
            name: apiUser.name,
            id: apiUser.id.toString()
        };
    }
    if(apiLiquidate) {
        liquidate.actionLoader = false;
        liquidate.amount = apiLiquidate.montant;
        liquidate.id = apiLiquidate.id.toString();
        liquidate.creation = apiLiquidate.created_at;
    }
    return liquidate;
}

// Extract liquidates data
export function extractLiquidatesData(apiLiquidates) {
    const liquidates = [];
    apiLiquidates.forEach(data => {
        liquidates.push(extractLiquidateData(
            data.puce_emetrice,
            data.puce_receptrice,
            data.utilisateur,
            data.flottage,
        ));
    });
    return liquidates;
}

// Combine to export all functions at once
export default function* sagaLiquidates() {
    yield all([
        fork(emitAddLiquidate),
        fork(emitLiquidatesFetch),
        fork(emitNextLiquidatesFetch),
    ]);
}
