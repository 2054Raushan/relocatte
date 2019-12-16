/* eslint-disable linebreak-style */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './rootReducer';

const persistConfig = {
    key: 'root',
    storage,
};

const middleWare = [];
middleWare.push(thunk);

const loggerMiddleware = createLogger({
    predicate: () => process.env.NODE_ENV === 'development',
});
middleWare.push(loggerMiddleware);

const persistedReducer = persistReducer(persistConfig, rootReducer);
let storeEnhancers = applyMiddleware(...middleWare);

if (process.env.NODE_ENV === 'development') {
    storeEnhancers = composeWithDevTools(storeEnhancers);
}

const store = createStore(persistedReducer, storeEnhancers);
const persistor = persistStore(store);

export {
    store,
    persistor,
};
