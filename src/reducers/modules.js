const modulesReducersDefaultState = [];

export default (state = modulesReducersDefaultState, action) => {
  switch (action.type) {
    case 'SET_MODULES':
      return action.modules;
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