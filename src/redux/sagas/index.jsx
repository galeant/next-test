import { all } from 'redux-saga/effects';
import breedSaga from './breedSaga'
import authSaga from './authSaga';
import orderSaga from './orderSaga';

export default function* rootSaga() {
    yield all([
        ...breedSaga(),
        ...authSaga(),
        ...orderSaga(),
    ]);
}