import { takeLatest, put, call } from 'redux-saga/effects';
import { postData } from 'src/apiCall'
import { setAuth, setError } from '../action/auth';
import Cookies from 'js-cookie';

function* login({ payload }) {
    const url = `/admin/login`
    try {
        const { data } = yield call(postData, url, payload);
        Cookies.set('token', data.token, { sameSite: 'strict' });
        yield put(setAuth(data));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* logout() {
    try {
        const data = { user: null, token: null, intendedPath: '/' };
        yield put(setAuth(data));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* authSaga() {
    yield takeLatest('LOGIN', login);
    yield takeLatest('LOGOUT', logout);
}

export default authSaga;
