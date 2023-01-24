const loggerMiddleware = (store: { getState: () => any }) => (next: (arg0: any) => any) => (action: { type: any }) => {
  console.group(action.type);
  console.info('dispatching', action);
  console.log('before state', store.getState());

  // 액션을 다음 미들웨어 또는 리듀서에 전달
  const result = next(action);

  // next(action)후 state는 정의된 동작에 따라 변한다
  // next(action)없이 return store.getState()하면 상태는 변하지 않는다
  console.log('next state', store.getState());

  console.groupEnd();

  return result;
};
export default loggerMiddleware;
