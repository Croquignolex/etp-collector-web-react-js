import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, apiPostRequest} from "../../functions/axiosFunctions";
import {
    EMIT_ADD_NETWORK_SUPPLY,
    EMIT_NETWORK_SUPPLIES_FETCH,
    storeSetNetworkSuppliesData,
    storeSetNewNetworkSupplyData,
    storeSetNextNetworkSuppliesData,
    EMIT_NEXT_NETWORK_SUPPLIES_FETCH,
    storeStopInfiniteScrollNetworkSupplyData
} from "./actions";
import {
    storeNetworkSuppliesRequestInit,
    storeNetworkSuppliesRequestFailed,
    storeAddNetworkSupplyRequestInit,
    storeNetworkSuppliesRequestSucceed,
    storeAddNetworkSupplyRequestFailed,
    storeNextNetworkSuppliesRequestInit,
    storeAddNetworkSupplyRequestSucceed,
    storeNextNetworkSuppliesRequestFailed,
    storeNextNetworkSuppliesRequestSucceed
} from "../requests/networkSupplies/actions";

// Fetch network supplies from API
export function* emitNetworkSuppliesFetch() {
    yield takeLatest(EMIT_NETWORK_SUPPLIES_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeNetworkSuppliesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.NETWORK_SUPPLIES_API_PATH}?page=1`);
            // Extract data
            const networkSupplies = extractNetworkSuppliesData(apiResponse.data.flottages);
            // Fire event to redux
            yield put(storeSetNetworkSuppliesData({networkSupplies, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeNetworkSuppliesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNetworkSuppliesRequestFailed({message}));
        }
    });
}

// Fetch next network supplies from API
export function* emitNextNetworkSuppliesFetch() {
    yield takeLatest(EMIT_NEXT_NETWORK_SUPPLIES_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextNetworkSuppliesRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.NETWORK_SUPPLIES_API_PATH}?page=${page}`);
            // Extract data
            const networkSupplies = extractNetworkSuppliesData(apiResponse.data.flottages);
            // Fire event to redux
            yield put(storeSetNextNetworkSuppliesData({networkSupplies, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextNetworkSuppliesRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextNetworkSuppliesRequestFailed({message}));
            yield put(storeStopInfiniteScrollNetworkSupplyData());
        }
    });
}

// Fleets new network supply from API
export function* emitAddNetworkSupply() {
    yield takeLatest(EMIT_ADD_NETWORK_SUPPLY, function*({amount, collectorSim, agentSim, agent}) {
        try {
            // Fire event for request
            yield put(storeAddNetworkSupplyRequestInit());
            const data = {montant: amount, id_agent: agent, id_sim_agent: agentSim, id_sim_rz: collectorSim};
            const apiResponse = yield call(apiPostRequest, api.NEW_NETWORK_SUPPLY_API_PATH, data);
            // Extract data
            const networkSupply = extractNetworkSupplyData(
                apiResponse.data.puce_receptrice,
                apiResponse.data.user,
                apiResponse.data.agent,
                apiResponse.data.approvisionnement
            );
            // Fire event to redux
            yield put(storeSetNewNetworkSupplyData({networkSupply}))
            // Fire event for request
            yield put(storeAddNetworkSupplyRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAddNetworkSupplyRequestFailed({message}));
        }
    });
}

// Extract network supply data
function extractNetworkSupplyData(apiSimIncoming, apiUser, apiAgent, apiNetworkSupply) {
    let supply = {
        id: '', amount: '', creation: '', remaining: '', status: '',

        agent: {id: '', name: ''},
        sim_incoming: {id: '', name: '', number: ''},
    };
    if(apiAgent && apiUser) {
        supply.agent = {
            name: apiUser.name,
            id: apiUser.id.toString()
        };
    }
    if(apiSimIncoming) {
        supply.sim_incoming = {
            name: apiSimIncoming.nom,
            number: apiSimIncoming.numero,
            id: apiSimIncoming.id.toString()
        };
    }
    if(apiNetworkSupply) {
        supply.actionLoader = false;
        supply.status = apiNetworkSupply.statut;
        supply.amount = apiNetworkSupply.montant;
        supply.remaining = apiNetworkSupply.reste;
        supply.id = apiNetworkSupply.id.toString();
        supply.creation = apiNetworkSupply.created_at;
    }
    return supply;
}

// Extract network supplies data
export function extractNetworkSuppliesData(apiNetworkSupplies) {
    const supplies = [];
    apiNetworkSupplies.forEach(data => {
        supplies.push(extractNetworkSupplyData(
            data.puce_receptrice,
            data.user,
            data.agent,
            data.approvisionnement,
        ));
    });
    return supplies;
}

// Combine to export all functions at once
export default function* sagaNetworkSupplies() {
    yield all([
        fork(emitAddNetworkSupply),
        fork(emitNetworkSuppliesFetch),
        fork(emitNextNetworkSuppliesFetch),
    ]);
}
