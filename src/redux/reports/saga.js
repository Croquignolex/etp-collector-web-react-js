import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiPostRequest} from "../../functions/axiosFunctions";
import {EMIT_REPORTS_FETCH, storeSetReportsData} from "./actions";
import {dateToString, shortDateToString} from "../../functions/generalFunctions";
import {
    storeReportsRequestInit,
    storeReportsRequestFailed,
    storeReportsRequestSucceed
} from "../requests/reports/actions";

// Fetch reports from API
export function* emitReportsFetch() {
    yield takeLatest(EMIT_REPORTS_FETCH, function*({selectedDay}) {
        try {
            // Fire event for request
            yield put(storeReportsRequestInit());
            const data = {
                journee: shortDateToString(selectedDay)
            };
            const apiResponse = yield call(apiPostRequest, api.PERSONAL_REPORTS_API_PATH, data);
            // Extract data
            const reports = extractReportsData(
                apiResponse.data.rapports
            );
            // Fire event to redux
            yield put(storeSetReportsData({reports}));
            // Fire event for request
            yield put(storeReportsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeReportsRequestFailed({message}));
        }
    });
}

// Extract sim movements data
function extractReportsData(apiReports) {
    let movements = [];

    apiReports.forEach(movement => {
        movements.push({
            in: movement.in,
            out: movement.out,
            type: movement.type,
            label: movement.name,
            balance: movement.balance,
            creation: dateToString(movement.created_at),
        });
    });

    return movements;
}

// Combine to export all functions at once
export default function* sagaSims() {
    yield all([
        fork(emitReportsFetch),
    ]);
}