import { all, fork, call, put, takeLatest, take } from 'redux-saga/effects';
import { decrementAsync, decrementAsyncSuccess, decrementAsyncFailed } from './counterSlice';
import { fetchCount, FetchCounterReponse } from '../../api/api';

function* fetchDecrementAsync(action: { payload: any }) {
  try {
    const paylod = Number(action.payload);
    const response: FetchCounterReponse = yield call(fetchCount, paylod);
    yield put(decrementAsyncSuccess(response.value));
  } catch (error) {
    console.error(error);
    yield put(decrementAsyncFailed(error));
  }
}

// getData 액션을 감지하는 함수를 작성합니다.
// 해당 함수는 getData 액션을 감지하고 있다가,
// 액션이 실행되면, 두번째 인자로 들어있는 제너레이터 함수를 실행합니다.
export function* watchFetchDecrementAsync() {
  console.log('test');
  yield takeLatest(decrementAsync, fetchDecrementAsync);
}
