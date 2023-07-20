import { select } from 'redux-saga/effects';
import axios from 'axios';

axios.defaults.baseURL = 'http://api-pristine-revamp.local';

function* getCall(url) {
    const token = yield select((state) => state.auth.token);
    const headers = {
        Authorization: `Bearer ${token}`
    };
    try {
        const res = yield axios.get(url, { headers });
        return res.data;
    } catch (error) {
        const { status, data } = error.response;
        throw {
            errCode: status,
            message: data.message
        };
    }
}

function* postDataCall(url, data) {
    const token = yield select((state) => state.auth.token);
    const headers = {
        Authorization: `Bearer ${token}`
    };
    try {
        const res = yield axios.post(url, data, { headers });
        return res.data;
    } catch (error) {
        const { status, data } = error.response;
        throw {
            errCode: status,
            message: data.message
        };
    }
}

function* postDataFormCall(url, data) {
    const token = yield select((state) => state.auth.token);
    const headers = {
        Authorization: `Bearer ${token}`
    };
    try {
        const res = yield axios.post(url, data, { headers });
        return res.data;
    } catch (error) {
        const { status, data } = error.response;
        throw {
            errCode: status,
            message: data.message
        };
    }
}

function* deleteCall(url) {
    const token = yield select((state) => state.auth.token);
    const headers = {
        Authorization: `Bearer ${token}`
    };
    try {
        const res = yield axios.delete(url, { headers });
        return res.data;
    } catch (error) {
        const { status, data } = error.response;
        throw {
            errCode: status,
            message: data.message
        };
    }
}

export { getCall, postDataCall, postDataFormCall, deleteCall }
