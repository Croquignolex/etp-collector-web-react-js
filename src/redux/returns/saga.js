import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {storeUpdateSupplyData} from "../supplies/actions";
import {apiGetRequest, apiPostRequest, getFileFromServer} from "../../functions/axiosFunctions";
import {
    EMIT_NEW_RETURN,
    EMIT_RETURNS_FETCH,
    EMIT_CANCEL_RETURN,
    storeSetReturnsData,
    storeCancelReturnData,
    EMIT_NEXT_RETURNS_FETCH,
    storeSetNextReturnsData,
    storeSetReturnActionData,
    storeStopInfiniteScrollReturnData
} from "./actions";
import {
    storeReturnRequestInit,
    storeReturnsRequestInit,
    storeReturnRequestFailed,
    storeReturnsRequestFailed,
    storeReturnRequestSucceed,
    storeReturnsRequestSucceed,
    storeNextReturnsRequestInit,
    storeCancelReturnRequestInit,
    storeNextReturnsRequestFailed,
    storeNextReturnsRequestSucceed,
    storeCancelReturnRequestFailed,
    storeCancelReturnRequestSucceed,
} from "../requests/returns/actions";

// Fetch returns from API
export function* emitReturnsFetch() {
    yield takeLatest(EMIT_RETURNS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeReturnsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.FLEET_RECOVERIES_API_PATH}?page=1`);
            // Extract data
            const returns = extractReturnsData(apiResponse.data.recouvrements);
            // Fire event to redux
            yield put(storeSetReturnsData({returns, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeReturnsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeReturnsRequestFailed({message}));
        }
    });
}

// Fetch next returns from API
export function* emitNextReturnsFetch() {
    yield takeLatest(EMIT_NEXT_RETURNS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextReturnsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.FLEET_RECOVERIES_API_PATH}?page=${page}`);
            // Extract data
            const returns = extractReturnsData(apiResponse.data.recouvrements);
            // Fire event to redux
            yield put(storeSetNextReturnsData({returns, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextReturnsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextReturnsRequestFailed({message}));
            yield put(storeStopInfiniteScrollReturnData());
        }
    });
}

// New return from API
export function* emitNewReturn() {
    yield takeLatest(EMIT_NEW_RETURN, function*({supply, amount, agentSim, managerSim}) {
        try {
            // Fire event for request
            yield put(storeReturnRequestInit());
            const data = {id_flottage: supply, montant: amount, puce_agent: agentSim, puce_flottage: managerSim};
            const apiResponse = yield call(apiPostRequest, api.NEW_FLEET_RECOVERIES_API_PATH, data);
            // Fire event to redux
            yield put(storeUpdateSupplyData({id: supply, amount}));
            // Fire event for request
            yield put(storeReturnRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeReturnRequestFailed({message}));
        }
    });
}

// Cancel return from API
export function* emitCancelReturn() {
    yield takeLatest(EMIT_CANCEL_RETURN, function*({id}) {
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetReturnActionData({id}));
            // Fire event for request
            yield put(storeCancelReturnRequestInit());
            const apiResponse = yield call(apiPostRequest, `${api.CANCEL_RETURN_API_PATH}/${id}`);
            // Fire event to redux
            yield put(storeCancelReturnData({id}));
            // Fire event at redux to toggle action loader
            yield put(storeSetReturnActionData({id}));
            // Fire event for request
            yield put(storeCancelReturnRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSetReturnActionData({id}));
            yield put(storeCancelReturnRequestFailed({message}));
        }
    });
}

// Extract recovery data
function extractRecoveryData(apiRecovery, apiUser, apiAgent, apiCollector, apiSimOutgoing, apiSimIncoming, apiOperator) {
    let recovery = {
        id: '', amount: '', creation: '', receipt: '', status: '',

        agent: {id: '', name: ''},
        operator: {id: '', name: ''},
        collector: {id: '', name: ''},
        sim_outgoing: {id: '', name: '', number: ''},
        sim_incoming: {id: '', name: '', number: ''},
    };
    if(apiAgent && apiUser) {
        recovery.agent = {
            name: apiUser.name,
            id: apiUser.id.toString()
        };
    }
    if(apiCollector) {
        recovery.collector = {
            name: apiCollector.name,
            id: apiCollector.id.toString(),
        };
    }
    if(apiOperator) {
        recovery.operator = {
            name: apiOperator.nom,
            id: apiOperator.id.toString(),
        };
    }
    if(apiSimOutgoing) {
        recovery.sim_outgoing = {
            name: apiSimOutgoing.nom,
            number: apiSimOutgoing.numero,
            id: apiSimOutgoing.id.toString()
        };
    }
    if(apiSimIncoming) {
        recovery.sim_incoming = {
            name: apiSimIncoming.nom,
            number: apiSimIncoming.numero,
            id: apiSimIncoming.id.toString()
        };
    }
    if(apiRecovery) {
        recovery.actionLoader = false;
        recovery.status = apiRecovery.statut;
        recovery.amount = apiRecovery.montant;
        recovery.id = apiRecovery.id.toString();
        recovery.creation = apiRecovery.created_at;
        recovery.receipt = getFileFromServer(apiRecovery.recu);
    }
    return recovery;
}

// Extract returns data
function extractReturnsData(apiReturns) {
    const returns = [];
    if(apiReturns) {
        apiReturns.forEach(data => {
            returns.push(extractRecoveryData(
                data.recouvrement,
                data.user,
                data.agent,
                data.recouvreur,
                data.puce_agent,
                data.puce_flottage,
                data.operateur,
            ));
        });
    }
    return returns;
}

// Combine to export all functions at once
export default function* sagaReturns() {
    yield all([
        fork(emitNewReturn),
        fork(emitReturnsFetch),
        fork(emitCancelReturn),
        fork(emitNextReturnsFetch),
    ]);
}
