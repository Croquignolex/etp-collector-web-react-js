import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {
    EMIT_ADD_FLEET,
    EMIT_CANCEL_FLEET,
    EMIT_FLEETS_FETCH,
    storeSetFleetsData,
    storeCancelFleetData,
    storeSetNewFleetData,
    EMIT_ALL_FLEETS_FETCH,
    storeSetNextFleetsData,
    EMIT_NEXT_FLEETS_FETCH,
    storeSetFleetActionData,
    storeStopInfiniteScrollFleetData
} from "./actions";
import {
    storeFleetsRequestInit,
    storeFleetsRequestFailed,
    storeAddFleetRequestInit,
    storeFleetsRequestSucceed,
    storeAllFleetsRequestInit,
    storeAddFleetRequestFailed,
    storeNextFleetsRequestInit,
    storeAllFleetsRequestFailed,
    storeAddFleetRequestSucceed,
    storeCancelFleetRequestInit,
    storeNextFleetsRequestFailed,
    storeAllFleetsRequestSucceed,
    storeNextFleetsRequestSucceed,
    storeCancelFleetRequestFailed,
    storeCancelFleetRequestSucceed
} from "../requests/fleets/actions";

// Fetch fleets from API
export function* emitFleetsFetch() {
    yield takeLatest(EMIT_FLEETS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeFleetsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.FLEETS_API_PATH}?page=1`);
            // Extract data
            const fleets = extractFleetsData(apiResponse.data.demandes);
            // Fire event to redux
            yield put(storeSetFleetsData({fleets, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeFleetsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeFleetsRequestFailed({message}));
        }
    });
}

// Fetch next fleets from API
export function* emitNextFleetsFetch() {
    yield takeLatest(EMIT_NEXT_FLEETS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextFleetsRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.FLEETS_API_PATH}?page=${page}`);
            // Extract data
            const fleets = extractFleetsData(apiResponse.data.demandes);
            // Fire event to redux
            yield put(storeSetNextFleetsData({fleets, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextFleetsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextFleetsRequestFailed({message}));
            yield put(storeStopInfiniteScrollFleetData());
        }
    });
}

// Fetch all fleets from API
export function* emitAllFleetsFetch() {
    yield takeLatest(EMIT_ALL_FLEETS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllFleetsRequestInit());
            const apiResponse = yield call(apiGetRequest, api.ALL_FLEETS_API_PATH);
            // Extract data
            const fleets = extractFleetsData(apiResponse.data.demandes);
            // Fire event to redux
            yield put(storeSetFleetsData({fleets, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllFleetsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllFleetsRequestFailed({message}));
        }
    });
}

// New fleet from API
export function* emitAddFleet() {
    yield takeLatest(EMIT_ADD_FLEET, function*({sim, amount, agent}) {
        try {
            // Fire event for request
            yield put(storeAddFleetRequestInit());
            const data = {id_puce: sim, id_agent: agent, montant: amount};
            const apiResponse = yield call(apiPostRequest, api.NEW_FLEET_API_PATH, data);
            // Extract data
            const fleet = extractFleetData(
                apiResponse.data.puce,
                apiResponse.data.user,
                apiResponse.data.agent,
                apiResponse.data.demandeur,
                apiResponse.data.demande,
                apiResponse.data.operateur,
            );
            // Fire event to redux
            yield put(storeSetNewFleetData({fleet}))
            // Fire event for request
            yield put(storeAddFleetRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddFleetRequestFailed({message}));
        }
    });
}

// Cancel fleet from API
export function* emitCancelFleet() {
    yield takeLatest(EMIT_CANCEL_FLEET, function*({id}) {
        try {
            // Fire event at redux to toggle action loader
            yield put(storeSetFleetActionData({id}));
            // Fire event for request
            yield put(storeCancelFleetRequestInit());
            const apiResponse = yield call(apiPostRequest, `${api.CANCEL_FLEET_API_PATH}/${id}`);
            // Fire event to redux
            yield put(storeCancelFleetData({id}));
            // Fire event at redux to toggle action loader
            yield put(storeSetFleetActionData({id}));
            // Fire event for request
            yield put(storeCancelFleetRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeSetFleetActionData({id}));
            yield put(storeCancelFleetRequestFailed({message}));
        }
    });
}

// Extract fleet data
function extractFleetData(apiSim, apiUser, apiAgent, apiClaimer, apiFleet, apiOperator) {
    let fleet = {
        id: '', amount: '', status: '', creation: '',

        agent: {id: '', name: ''},
        operator: {id: '', name: ''},
        sim: {id: '', name: '', number: ''},
        claimant: {id: '', name: '', phone: ''},
    };

    if(apiAgent && apiUser) {
        fleet.agent = {
            name: apiUser.name,
            id: apiUser.id.toString(),
            reference: apiAgent.reference
        };
    }
    if(apiSim) {
        fleet.sim = {
            name: apiSim.nom,
            number: apiSim.numero,
            id: apiSim.id.toString()
        };
    }
    if(apiClaimer) {
        fleet.claimant = {
            name: apiClaimer.name,
            phone: apiClaimer.phone,
            id: apiClaimer.id.toString(),
        }
    }
    if(apiOperator) {
        fleet.operator = {
            name: apiOperator.nom,
            id: apiOperator.id.toString()
        };
    }
    if(apiFleet) {
        fleet.actionLoader = false;
        fleet.status = apiFleet.statut;
        fleet.amount = apiFleet.montant;
        fleet.remaining = apiFleet.reste;
        fleet.id = apiFleet.id.toString();
        fleet.creation = apiFleet.created_at;
    }
    return fleet;
}

// Extract fleets data
function extractFleetsData(apiFleets) {
    const fleets = [];
    if(apiFleets) {
        apiFleets.forEach(data => {
            fleets.push(extractFleetData(
                data.puce,
                data.user,
                data.agent,
                data.demandeur,
                data.demande,
                data.operateur,
            ));
        });
    }
    return fleets;
}

// Combine to export all functions at once
export default function* sagaFleets() {
    yield all([
        fork(emitAddFleet),
        fork(emitCancelFleet),
        fork(emitFleetsFetch),
        fork(emitAllFleetsFetch),
        fork(emitNextFleetsFetch),
    ]);
}
