import { all, fork } from 'redux-saga/effects';
import { counterSaga } from '../../features/counter/counterSaga';

export function* rootSaga() {
  yield all([fork(counterSaga)]);
}
