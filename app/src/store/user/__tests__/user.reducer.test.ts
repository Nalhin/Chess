import userReducer, { USER_INITIAL_STATE } from '../user.reducer';
import produce from 'immer';
import { fakeUser } from '../../../../test/fixtures/user/user';
import {
  authenticationSucceeded,
  loginUserSucceeded,
  logoutUser,
  registerUserSucceeded,
  setToken,
} from '../user.actions';

describe('User reducer', () => {
  it('should handle LOGIN_USER_SUCCEEDED action', () => {
    const initialState = {
      ...USER_INITIAL_STATE,
    };
    const expectedState = produce(USER_INITIAL_STATE, draft => {
      draft.data = fakeUser;
    });

    const action = loginUserSucceeded(fakeUser);
    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle REGISTER_USER_SUCCEEDED action', () => {
    const initialState = {
      ...USER_INITIAL_STATE,
    };
    const expectedState = produce(USER_INITIAL_STATE, draft => {
      draft.data = fakeUser;
    });

    const action = registerUserSucceeded(fakeUser);
    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle AUTHENTICATION_SUCCEEDED action', () => {
    const initialState = {
      ...USER_INITIAL_STATE,
    };
    const expectedState = produce(USER_INITIAL_STATE, draft => {
      draft.data = fakeUser;
    });

    const action = authenticationSucceeded(fakeUser);
    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle SET_TOKEN action', () => {
    const initialState = {
      ...USER_INITIAL_STATE,
    };
    const expectedState = produce(USER_INITIAL_STATE, draft => {
      draft.data.token = fakeUser.token;
    });

    const action = setToken(fakeUser.token);
    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
  it('should handle LOGOUT_USER action', () => {
    const initialState = produce(USER_INITIAL_STATE, draft => {
      draft.data = fakeUser;
    });
    const expectedState = {
      ...USER_INITIAL_STATE,
    };

    const action = logoutUser();
    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
});
