const modulesReducersDefaultState =  [];

export default (state = modulesReducersDefaultState, action) => {
  switch (action.type) {
    case 'SET_MODULES':
      return action.modules;
    case 'COMPLETE_MODULE':
        return state.map((module) => {
          if(module.number === action.module.number) {
            return {
              ...module,
              ...action.module
            };
          } else {
            return module;
          }
        });
    default:
      return state;
  }
};