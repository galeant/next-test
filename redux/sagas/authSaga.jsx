import { takeLatest, put, call } from 'redux-saga/effects';
import { postDataCall } from 'apiCall'
import { setAuth } from '../action/auth';
import { setError, setLoading } from '../action/general';
// import Cookies from 'js-cookie';

function* login({ payload }) {
    const url = `/admin/login`
    try {
        const { data } = yield call(postDataCall, url, payload);
        // Cookies.set('token', data.token, { sameSite: 'strict' });
        yield put(setAuth(data));
        yield put(setError({}));
    } catch (error) {
        yield put(setError(error));
    }
}

function* logout() {
    try {
        const data = { user: null, token: null, intendedPath: '/' };
        yield put(setAuth(data));
        yield put(setError({}));
    } catch (error) {
        yield put(setError(error));
    }
}

function* authSaga() {
    yield takeLatest('LOGIN', login);
    yield takeLatest('LOGOUT', logout);
}

export default authSaga;
