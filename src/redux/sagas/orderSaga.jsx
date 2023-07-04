import { takeEvery, select, takeLatest, put, call } from 'redux-saga/effects';
import { setOrderList, setOrderDetail,setError } from '../action/order'
import { getData, postData } from 'src/apiCall'

const mainUrl = '/admin/order'


function* getList({ queryParams }) {
    try {
        const data = yield call(postData, mainUrl, queryParams);
        yield put(setOrderList(data));
    } catch (error) {
        yield put(setError(error));
    }
}

function* getDetail({ id }) {
    const url = `${mainUrl}/${id}/detail`
    try {
        const data = yield call(getData, url);
        yield put(setOrderDetail(data));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* orderSaga() {
    yield takeEvery('GET_ORDER_LIST', getList);
    yield takeEvery('GET_ORDER_DETAIL', getDetail);
}

export default orderSaga;
