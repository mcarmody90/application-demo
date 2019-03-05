import authReducer from '../../reducers/auth';

test('should login', () => {
  const action = {
    type: 'LOGIN',
    uid: '123'
  };
  const state = authReducer(undefined, action);
  expect(state).toEqual({uid: '123'});
});

test('should logout', () => {
  const action = {
    type: 'LOGOUT'
  };
  const state = authReducer(undefined, action);
  expect(state).toEqual({});
});