// import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery } from 'redux-saga/effects';

import { counterActions } from './counterSlice';

function* getActionSaga(action: any) {
  // function* getActionSaga(action: PayloadAction<typeof counterActions>) {
  try {
    console.log('saga run');
    yield console.log(action.type);
  } catch (err) {
    console.dir(err);
  }
}

export function* counterSaga() {
  yield takeEvery(counterActions.incrementByAmount.type, getActionSaga);
}
