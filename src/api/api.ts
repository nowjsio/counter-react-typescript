import axios from 'axios';

export interface FetchCounterReponse {
  value: number;
}

export function fetchCount(amount = 10): Promise<FetchCounterReponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (amount === 4) {
        reject(new Error('amount is 4, thorw 4 error'));
      } else {
        resolve({ value: amount });
      }
    }, 1000);
  });
}

export default axios.create();
