import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  decrementByAmount,
  decrementAsync,
  // selectCount,
  MIN_VALUE,
  MAX_VALUE,
} from './counterSlice';

import styles from './Counter.module.css';
import { useAppDispatch, RootState } from '../../app/store';

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const onIncrement = useCallback(() => {
    dispatch(increment());
  }, [dispatch]);

  const onDecrement = useCallback(() => {
    dispatch(decrement());
  }, [dispatch]);

  const onIncrementAmount = useCallback(() => {
    dispatch(incrementByAmount(Number(incrementAmount) || 0));
  }, [dispatch, incrementAmount]);

  const onDecrementAmount = useCallback(() => {
    dispatch(decrementByAmount(Number(incrementAmount) || 0));
  }, [dispatch, incrementAmount]);

  const onAsyncIncrementAmount = useCallback(() => {
    dispatch(incrementAsync(Number(incrementAmount) || 0));
  }, [dispatch, incrementAmount]);
  const onAysyncDecrementAmount = useCallback(() => {
    dispatch(decrementAsync(Number(incrementAmount) || 0));
  }, [dispatch, incrementAmount]);

  return (
    <div>
      <div className={styles.row}>
        <button type="button" className={styles.button} aria-label="Increment value" onClick={onIncrement}>
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button type="button" className={styles.button} aria-label="Decrement value" onClick={onDecrement}>
          -
        </button>
      </div>
      <div className={styles.buttonWrapper}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <div className={styles.range}>RANGE: {`${MIN_VALUE} < sum < ${MAX_VALUE}`}</div>
        <div className={styles.increment}>
          <button type="button" className={styles.button} onClick={onIncrementAmount}>
            Add Amount
          </button>

          <button type="button" className={styles.asyncButton} onClick={onAsyncIncrementAmount}>
            Add Async
          </button>
        </div>
        <div className={styles.decrement}>
          <button type="button" className={styles.button} onClick={onDecrementAmount}>
            Sub Amount
          </button>

          <button type="button" className={styles.asyncButton} onClick={onAysyncDecrementAmount}>
            Sub Async
          </button>
        </div>
      </div>
    </div>
  );
}
