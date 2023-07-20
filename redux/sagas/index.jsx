import { all } from 'redux-saga/effects';
import breedSaga from './breedSaga'
import authSaga from './authSaga';
import orderSaga from './orderSaga';
import promoSaga from './promoSaga'

export default function* rootSaga() {
    yield all([
        ...breedSaga(),
        ...authSaga(),
        ...orderSaga(),
        ...promoSaga(),
    ]);
}