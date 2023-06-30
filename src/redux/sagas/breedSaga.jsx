import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import { setBreedList, setError } from '../action/breed'
import { getData, postData } from 'src/apiCall'

const mainUrl = '/admin/breed'

function* getList({ queryParams }) {
    const params = new URLSearchParams();
    for (const key in queryParams) {
        params.append(key, queryParams[key]);
      }
      
    const url = `${mainUrl}/list?${params}`
    try {
        const data = yield call(getData, url);
        yield put(setBreedList(data));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* getDetail({id}) {
    const url = `${mainUrl}/${id}/detail`
    try {
        const data = yield call(getData, url);
        yield put(setBreedDetail(data));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* createData({data}) {
    const url = `${mainUrl}/create`
    try {
        const data = yield call(postData, url, data);
        yield put(setBreedDetail({}));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* updateData({id,data}) {
    const url = `${mainUrl}/${id}/update`
    try {
        const data = yield call(postData, url,data);
        yield put(setBreedDetail(data));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* deleteData({id}) {
    const url = `${mainUrl}/${id}/delete`
    try {
        const data = yield call(get, url);
        yield put(setBreedDetail({}));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* breedSaga() {
    yield takeEvery('GET_BREED_LIST', getList);
    yield takeEvery('GET_BREED_DETAIL', getDetail);
    yield takeLatest('POST_BREED', createData);
    yield takeLatest('UPDATE_BREED', updateData);
    yield takeLatest('DELETE_BREED', deleteData);
}

export default breedSaga;
