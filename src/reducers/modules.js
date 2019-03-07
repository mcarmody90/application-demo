const modulesReducersDefaultState =  [
  {
    number: 1,
    moduleComplete: 0
  },
  {
    number: 2,
    moduleComplete: 0
  },
  {
    number: 3,
    moduleComplete: 0
  },
  {
    number: 4,
    moduleComplete: 0
  },
  {
    number: 5,
    moduleComplete: 0
  },
  {
    number: 6,
    moduleComplete: 0
  },
  {
    number: 7,
    moduleComplete: 0
  },
  {
    number: 8,
    moduleComplete: 0
  },
  {
    number: 9,
    moduleComplete: 0
  },
  {
    number: 10,
    moduleComplete: 0
  }
];

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