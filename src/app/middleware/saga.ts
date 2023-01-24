import { all, fork } from 'redux-saga/effects';
import { watchFetchDecrementAsync } from '../../features/counter/counterSaga';

export function* rootSaga() {
  yield all([fork(watchFetchDecrementAsync)]);
}
