import { all, takeLatest, put, fork, call } from 'redux-saga/effects'

import * as api from "../../constants/apiConstants";
import {apiGetRequest} from "../../functions/axiosFunctions";
import {storeSetVendorsData, EMIT_ALL_VENDORS_FETCH} from "./actions";
import {
    storeAllVendorsRequestInit,
    storeAllVendorsRequestFailed,
    storeAllVendorsRequestSucceed,
} from "../requests/vendors/actions";

// Fetch all vendors from API
export function* emitAllVendorsFetch() {
    yield takeLatest(EMIT_ALL_VENDORS_FETCH, function*() {
        try {
            // Fire event for request
            yield put(storeAllVendorsRequestInit());
            const apiResponse = yield call(apiGetRequest, api.ALL_VENDORS_API_PATH);
            // Extract data
            const vendors = extractVendorsData(apiResponse.data.vendors);
            // Fire event to redux
            yield put(storeSetVendorsData({vendors, hasMoreData: false, page: 0}));
            // Fire event for request
            yield put(storeAllVendorsRequestSucceed({message: apiResponse.message}));
        } catch (message) {
            // Fire event for request
            yield put(storeAllVendorsRequestFailed({message}));
        }
    });
}

// Extract zone data
function extractVendorData(apiVendor) {
    let vendor = {
        id: '', name: '', description: '', creation: '',
    };
    if(apiVendor) {
        vendor.actionLoader = false;
        vendor.name = apiVendor.name;
        vendor.id = apiVendor.id.toString();
        vendor.creation = apiVendor.created_at;
        vendor.description = apiVendor.description;
    }
    return vendor;
}

// Extract zones data
function extractVendorsData(apiVendors) {
    const vendors = [];
    if(apiVendors) {
        apiVendors.forEach(data => {
            vendors.push(extractVendorData(
                data.vendor
            ));
        });
    }
    return vendors;
}

// Combine to export all functions at once
export default function* sagaVendors() {
    yield all([
        fork(emitAllVendorsFetch)
    ]);
}