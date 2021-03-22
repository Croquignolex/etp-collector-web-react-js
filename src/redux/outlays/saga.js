import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest, getFileFromServer} from "../../functions/axiosFunctions";
import {
    storeOutlaysRequestInit,
    storeOutlaysRequestFailed,
    storeOutlaysRequestSucceed,
    storeNextOutlaysRequestInit,
    storeNextOutlaysRequestFailed,
    storeNextOutlaysRequestSucceed
} from "../requests/outlays/actions";
import {
    EMIT_OUTLAYS_FETCH,
    storeSetOutlaysData,
    EMIT_NEXT_OUTLAYS_FETCH,
    storeSetNextOutlaysData,
    storeStopInfiniteScrollOutlayData
} from "./actions";

// Fetch outlays from API
export function* emitOutlaysFetch() {
    yield takeLatest(EMIT_OUTLAYS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeOutlaysRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.OUTLAYS_API_PATH}?page=1`);
            // Extract data
            const outlays = extractOutlaysData(apiResponse.data.versements);
            // Fire event to redux
            yield put(storeSetOutlaysData({outlays, hasMoreData: apiResponse.data.hasMoreData, page: 2}));
            // Fire event for request
            yield put(storeOutlaysRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeOutlaysRequestFailed({message}));
        }
    });
}

// Fetch next outlays from API
export function* emitNextOutlaysFetch() {
    yield takeLatest(EMIT_NEXT_OUTLAYS_FETCH, function*({page}) {
        try {
            // Fire event for request
            yield put(storeNextOutlaysRequestInit());
            const apiResponse = yield call(apiGetRequest, `${api.OUTLAYS_API_PATH}?page=${page}`);
            // Extract data
            const outlays = extractOutlaysData(apiResponse.data.versements);
            // Fire event to redux
            yield put(storeSetNextOutlaysData({outlays, hasMoreData: apiResponse.data.hasMoreData, page: page + 1}));
            // Fire event for request
            yield put(storeNextOutlaysRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeNextOutlaysRequestFailed({message}));
            yield put(storeStopInfiniteScrollOutlayData());
        }
    });
}

// Extract payment data
function extractOutlayData(apiManager, apiCollector, apiOutlay) {
    let outlay = {
        id: '', amount: '', creation: '', receipt: '',

        manager: {id: '', name: ''},
        collector: {id: '', name: ''},
    };
    if(apiManager) {
        outlay.manager = {
            name: apiManager.name,
            id: apiManager.id.toString()
        };
    }
    if(apiCollector) {
        outlay.collector = {
            name: apiCollector.name,
            id: apiCollector.id.toString()
        };
    }
    if(apiOutlay) {
        outlay.amount = apiOutlay.montant;
        outlay.id = apiOutlay.id.toString();
        outlay.creation = apiOutlay.created_at;
        outlay.receipt = getFileFromServer(apiOutlay.recu);
    }
    return outlay;
}

// Extract outlays data
export function extractOutlaysData(apiOutlays) {
    const outlays = [];
    apiOutlays.forEach(data => {
        outlays.push(extractOutlayData(
            data.gestionnaire,
            data.recouvreur,
            data.versement,
        ));
    });
    return outlays;
}

// Combine to export all functions at once
export default function* sagaOutlays() {
    yield all([
        fork(emitOutlaysFetch),
        fork(emitNextOutlaysFetch),
    ]);
}
