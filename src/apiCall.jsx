import { select } from 'redux-saga/effects';
import axios from 'axios';

axios.defaults.baseURL = 'http://api-pristine-revamp.local';

function* getData(url) {
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

function* postData(url, data) {
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

function* postDataForm(url, data) {
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

function* deleteData(url) {
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

export { getData, postData, postDataForm, deleteData }
