import { takeEvery, select, takeLatest, put, call } from 'redux-saga/effects';
import { getCall, postDataCall, deleteCall, postDataFormCall } from 'apiCall'
import { setLoading } from 'redux/action/general';
import dayjs from 'dayjs';
import { setArticleDetail, setArticleList } from 'redux/action/article';

const mainUrl = '/admin/article'


function* getListData({ queryParams }) {
    const urlParams = new URLSearchParams(queryParams);
    const url = `${mainUrl}?`+urlParams;
    try {
        const data = yield call(getCall, url);
        yield put(setArticleList(data));
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
        yield put(setArticleDetail(data));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* deleteData({ id, queryParams }) {
    const url = `${mainUrl}/${id}/delete`
    try {
        const data = yield call(deleteCall, url);
        yield put({ type: 'GET_ARTICLE_LIST', queryParams });
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* postData({ id,submitData }) {
    let url = `${mainUrl}/create`
    if(id){
        url = `${mainUrl}/${id}/update`
    }
    if(typeof submitData.banner === 'string' || submitData.banner == null){
        delete submitData.banner;
    }

    let bodyFormData = new FormData();
    for (const key in submitData) {
        let keyAppend = key;
        let value = submitData[key];

        switch (key) {
            case 'title':
                for (const keyTitle in submitData['title']) {
                    keyAppend = `${key}[${keyTitle}]`
                    value = submitData['title'][keyTitle]
                    bodyFormData.append(keyAppend, value)
                }
                break;
            case 'slug':
                for (const keySlug in submitData['slug']) {
                    keyAppend = `${key}[${keySlug}]`
                    value = submitData['slug'][keySlug]
                    bodyFormData.append(keyAppend, value)
                }
                break;
            case 'content':
                for (const keyContent in submitData['content']) {
                    keyAppend = `${key}[${keyContent}]`
                    value = submitData['content'][keyContent]
                    bodyFormData.append(keyAppend, value)
                }
                break;
            case 'published_at':
                value = dayjs(value).format('YYYY-MM-DD')
                break;
            case 'banner':
                value = value[0];
                break;
        }
        bodyFormData.append(keyAppend, value)
    }
    try {
        const data = yield call(postDataFormCall, url, bodyFormData);
        yield put(setArticleDetail(data));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* articleSaga() {
    yield takeEvery('GET_ARTICLE_LIST', getListData);
    yield takeEvery('GET_ARTICLE_DETAIL', getDetailData);
    yield takeEvery('DELETE_ARTICLE', deleteData);
    yield takeEvery('POST_ARTICLE', postData);
}

export default articleSaga;
