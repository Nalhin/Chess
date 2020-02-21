import userReducer, { USER_INITIAL_STATE } from '../user.reducer';
import produce from 'immer';
import {
  fakeLoginUser,
  fakeRegisterUser,
  fakeUser,
} from '../../../../test/fixtures/user/fakeUser';
import {
  authenticationSucceeded,
  loginUserFailed,
  loginUserRequested,
  loginUserSucceeded,
  logoutUser,
  registerUserFailed,
  registerUserRequested,
  registerUserSucceeded,
  setToken,
} from '../user.actions';

describe('User reducer', () => {
  it('should handle LOGIN_USER_REQUESTED action type', () => {
    const initialState = {
      ...USER_INITIAL_STATE,
    };
    const expectedState = produce(USER_INITIAL_STATE, draft => {
      draft.isLoading = true;
    });

    const action = loginUserRequested(fakeLoginUser);
    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle REGISTER_USER_REQUESTED action type', () => {
    const initialState = {
      ...USER_INITIAL_STATE,
    };
    const expectedState = produce(USER_INITIAL_STATE, draft => {
      draft.isLoading = true;
    });

    const action = registerUserRequested(fakeRegisterUser);
    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle LOGIN_USER_SUCCEEDED action type', () => {
    const initialState = {
      ...USER_INITIAL_STATE,
      isLoading: true,
    };
    const expectedState = produce(USER_INITIAL_STATE, draft => {
      draft.data = fakeUser;
      draft.isLoading = false;
    });

    const action = loginUserSucceeded(fakeUser);
    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle REGISTER_USER_SUCCEEDED action type', () => {
    const initialState = {
      ...USER_INITIAL_STATE,
      isLoading: true,
    };
    const expectedState = produce(USER_INITIAL_STATE, draft => {
      draft.data = fakeUser;
      draft.isLoading = false;
    });

    const action = registerUserSucceeded(fakeUser);
    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle LOGIN_USER_FAILED action type', () => {
    const initialState = {
      ...USER_INITIAL_STATE,
      isLoading: true,
    };
    const expectedState = produce(USER_INITIAL_STATE, draft => {
      draft.isLoading = false;
    });

    const action = loginUserFailed();
    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle REGISTER_USER_FAILED action type', () => {
    const initialState = {
      ...USER_INITIAL_STATE,
      isLoading: true,
    };
    const expectedState = produce(USER_INITIAL_STATE, draft => {
      draft.isLoading = false;
    });

    const action = registerUserFailed();
    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle AUTHENTICATION_SUCCEEDED action type', () => {
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

  it('should handle SET_TOKEN action type', () => {
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
  it('should handle LOGOUT_USER action type', () => {
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
