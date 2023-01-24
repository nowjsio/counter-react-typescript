/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import createSagaMiddleware from '@redux-saga/core';
import { all, fork } from 'redux-saga/effects';
// import thunk from 'redux-thunk';
import counterReducer from '../features/counter/counterSlice';
import { counterSaga } from '../features/counter/counterSaga';
import loggerMidleware from './middleware/logger';

const sagaMiddleWare = createSagaMiddleware();
const middlewares = [sagaMiddleWare, loggerMidleware];
function* saga() {
  yield all([fork(counterSaga)]);
}

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
});

sagaMiddleWare.run(saga);

export default store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
