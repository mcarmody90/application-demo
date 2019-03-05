import { login, logout } from '../../actions/auth';

test('should login', () => {
  const action = login('123');
  expect(action).toEqual({
    type: 'LOGIN',
    uid: '123'
  });
});

test('should logout', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});