import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import sagas from './sagas/index';
import reducer from './reducers/index';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware, createLogger()]
});

sagaMiddleware.run(sagas);

export default store;
