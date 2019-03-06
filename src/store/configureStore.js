import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import modulesReducer from '../reducers/modules';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      modules: modulesReducer,
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};