import { takeEvery, select, takeLatest, put, call } from 'redux-saga/effects';
import { getPromoList, setPromoList, setPromoDetail, setError } from '../action/promo'
import { getCall, postDataCall, deleteCall } from 'apiCall'
import { setLoading } from 'redux/action/general';

const mainUrl = '/admin/promo'


function* getListData({ queryParams }) {
    try {
        const data = yield call(getCall, mainUrl);
        yield put(setPromoList(data));
        yield put(setLoading(false))
    } catch (error) {
        yield put(setError(error));
    }
}

function* getDetailData({ id }) {
    const url = `${mainUrl}/${id}/detail`
    try {
        const data = yield call(getCall, url);
        yield put(setPromoDetail(data));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* deleteData({ id, queryParams }) {
    const url = `${mainUrl}/${id}/delete`
    try {
        const data = yield call(deleteCall, url);
        yield put({ type: 'GET_PROMO_LIST', queryParams });
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* orderSaga() {
    yield takeEvery('GET_PROMO_LIST', getListData);
    yield takeEvery('GET_PROMO_DETAIL', getDetailData);
    yield takeEvery('DELETE_PROMO', deleteData);
}

export default orderSaga;
