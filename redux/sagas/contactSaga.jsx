import { takeEvery, select, takeLatest, put, call } from 'redux-saga/effects';
import { setContactList, setContactDetail } from '../action/contact'
import { getCall, postDataCall } from 'apiCall'
import { setLoading, setError } from 'redux/action/general';

const mainUrl = '/admin/contact'

function* getList({ queryParams }) {
    const urlParams = new URLSearchParams(queryParams);
    const url = `${mainUrl}?` + urlParams;
    try {
        const data = yield call(getCall, url);
        yield put(setContactList(data));
        yield put(setLoading(false))
    } catch (error) {
        yield put(setError(error));
    }
}

function* getDetail({ id }) {
    const url = `${mainUrl}/${id}/detail`
    try {
        const data = yield call(getCall, url);
        yield put(setOrderDetail(data));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* orderSaga() {
    yield takeEvery('GET_CONTACT_LIST', getList);
    yield takeEvery('GET_CONTACT_DETAIL', getDetail);
}

export default orderSaga;
