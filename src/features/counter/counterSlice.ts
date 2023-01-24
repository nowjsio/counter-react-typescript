/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-debugger */
import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-cycle

interface CounterState {
  value: number;
  MIN_VALUE: number;
  MAX_VALUE: number;
}
// interface IncrementType {
//   payload: string;
//   type: 'counter/incrementByAmount';
// }
const initialState = { value: 10, MIN_VALUE: 0, MAX_VALUE: 100 } as CounterState;
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      const result = state.value + 1;
      if (result > initialState.MAX_VALUE) {
        state.value = initialState.MAX_VALUE;
      } else {
        state.value = result;
      }
    },
    decrement(state) {
      const result = state.value - 1;
      if (result < initialState.MIN_VALUE) {
        state.value = initialState.MIN_VALUE;
      } else {
        state.value = result;
      }
    },
    incrementByAmount(state, action) {
      const result = state.value + action.payload;
      if (result > initialState.MAX_VALUE) {
        state.value = initialState.MAX_VALUE;
      } else {
        state.value = result;
      }
    },
    decrementByAmount(state, { payload }) {
      const result = state.value - payload;
      if (result < initialState.MIN_VALUE) {
        state.value = initialState.MIN_VALUE;
      } else {
        state.value = result;
      }
    },
  },
});

export const { increment, decrement, incrementByAmount, decrementByAmount } = counterSlice.actions;
export const counterActions = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount: number) => (dispatch: any) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const decrementAsync = (amount: number) => (dispatch: any) => {
  setTimeout(() => {
    dispatch(decrementByAmount(amount));
  }, 1000);
};

export const testFunc = (amount: number) => (dispatch: any) => {
  dispatch(incrementByAmount(amount));
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = (state: { counter: { value: number } }) => state.counter.value;
export const { MAX_VALUE, MIN_VALUE } = initialState;
export default counterSlice.reducer;
