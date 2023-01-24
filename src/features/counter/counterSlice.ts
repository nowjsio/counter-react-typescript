import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCount, FetchCounterReponse } from '../../api/api';

interface CounterState {
  value: number;
  status: string;
  MIN_VALUE: number;
  MAX_VALUE: number;
}

// interface IncrementType {
//   payload: string;
//   type: 'counter/incrementByAmount';
// }
const initialState = { value: 10, status: 'init', MIN_VALUE: 0, MAX_VALUE: 100 } as CounterState;

export const incrementAsync = createAsyncThunk('counter/incrementAsync', async (amount: number, _thukAPI) => {
  const response: FetchCounterReponse = await fetchCount(amount);
  return response.value;
});

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
    decrementAsync(state, { payload }) {
      state.status = payload;
    },
    decrementAsyncSuccess(state, { payload }) {
      state.status = 'success';
      const result = state.value - payload;
      if (result < initialState.MIN_VALUE) {
        state.value = initialState.MIN_VALUE;
      } else {
        state.value = result;
      }
    },
    decrementAsyncFailed(state, _action) {
      state.status = 'failed';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(incrementAsync.pending, (state, _action) => {
      state.status = 'pending';
    });
    builder.addCase(incrementAsync.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.value += action.payload;
    });
    builder.addCase(incrementAsync.rejected, (state, _action) => {
      state.status = 'rejected';
    });
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
  decrementAsync,
  decrementAsyncSuccess,
  decrementAsyncFailed,
} = counterSlice.actions;
export const counterActions = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync =
//   (amount: number) => (dispatch: (arg0: { payload: any; type: 'counter/incrementByAmount' }) => void) => {
//     setTimeout(() => {
//       dispatch(incrementByAmount(amount));
//     }, 1000);
//   };

// export const decrementAsync =
//   (amount: number) => (dispatch: (arg0: { payload: any; type: 'counter/decrementByAmount' }) => void) => {
//     setTimeout(() => {
//       dispatch(decrementByAmount(amount));
//     }, 1000);
//   };

export const testFunc = (amount: number) => (dispatch: any) => {
  dispatch(incrementByAmount(amount));
};
export const { MAX_VALUE, MIN_VALUE } = initialState;
export default counterSlice.reducer;
