import { takeEvery, select, takeLatest, put, call } from 'redux-saga/effects';
import { getPromoList, setPromoList, setPromoDetail, setError } from '../action/promo'
import { getCall, postDataCall, deleteCall, postDataFormCall } from 'apiCall'
import { setLoading } from 'redux/action/general';
import dayjs from 'dayjs';

const mainUrl = '/admin/promo'


function* getListData({ queryParams }) {
    const urlParams = new URLSearchParams(queryParams);
    const url = `${mainUrl}?`+urlParams;
    try {
        const data = yield call(getCall, url);
        yield put(setPromoList(data));
        yield put(setLoading(false))
        yield put({ type: 'SET_DEFAULT_DETAIL'});
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

function* postData({ id,submitData }) {
    let url = `${mainUrl}/create`
    if(id){
        url = `${mainUrl}/${id}/update`
    }
    if(typeof submitData.promo_thumbnail === 'string' ){
        delete submitData.promo_thumbnail;
    }
    if(typeof submitData.promo_image === 'string' ){
        delete submitData.promo_image;
    }

    let bodyFormData = new FormData();
    for (const key in submitData) {
        let value = submitData[key];

        switch (key) {
            case 'start_date':
                value = dayjs(value).format('YYYY-MM-DD')
                break;
            case 'end_date':
                value = dayjs(value).format('YYYY-MM-DD')
                break;
            case 'promo_thumbnail':
                value = value[0];
                break;
            case 'promo_image':
                if(!value[0] instanceof File){
                    continue;
                }
                value = value[0];
                break;
        }
        bodyFormData.append(key, value)
    }
    try {
        const data = yield call(postDataFormCall, url, bodyFormData);
        yield put(setPromoDetail(data));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* promoSaga() {
    yield takeEvery('GET_PROMO_LIST', getListData);
    yield takeEvery('GET_PROMO_DETAIL', getDetailData);
    yield takeEvery('DELETE_PROMO', deleteData);
    yield takeEvery('POST_PROMO', postData);
}

export default promoSaga;
