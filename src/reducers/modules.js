const modulesReducersDefaultState = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0
};

export default (state = modulesReducersDefaultState, action) => {
  switch (action.type) {
    case 'COMPLETE_MODULE':
      console.log('action: ', action);
      console.log('state: ', state);
      const moduleNumber = action.moduleNumber;
      if(state[moduleNumber] === 0) {
        return {
          ...state,
          [moduleNumber]: action.moduleComplete
        };
      }
    default:
      return state;
  }
};