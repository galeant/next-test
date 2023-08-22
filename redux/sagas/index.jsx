import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import orderSaga from './orderSaga';
import promoSaga from './promoSaga';
import articleSaga from './articleSaga';
import contactSaga from './contactSaga'

export default function* rootSaga() {
    yield all([
        ...authSaga(),
        ...orderSaga(),
        ...promoSaga(),
        ...articleSaga(),
        ...contactSaga(),
    ]);
}