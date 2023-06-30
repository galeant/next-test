import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createFilter } from 'redux-persist-transform-filter';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from './sagas';

const authFilter = createFilter('auth', ['user', 'token', 'intendedPath']);

// Configure Redux persistence
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
    transforms: [authFilter],
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

// Persist the store
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
