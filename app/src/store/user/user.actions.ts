import {
  User,
  UserLoginData,
  UserRegisterData,
} from '../../interfaces/User/User';
import {
  AuthenticationSucceededAction,
  LoginUserFailedAction,
  LoginUserRequestedAction,
  LoginUserSucceededAction,
  LogoutUserAction,
  RegisterUserFailedAction,
  RegisterUserRequestedAction,
  RegisterUserSucceededAction,
  SetTokenAction,
  UserActionTypes,
} from './user.types';

export const loginUserRequested = (
  user: UserLoginData,
): LoginUserRequestedAction => ({
  type: UserActionTypes.LOGIN_USER_REQUESTED,
  payload: {
    user,
  },
});

export const loginUserSucceeded = (user: User): LoginUserSucceededAction => ({
  type: UserActionTypes.LOGIN_USER_SUCCEEDED,
  payload: {
    user,
  },
});

export const loginUserFailed = (): LoginUserFailedAction => ({
  type: UserActionTypes.LOGIN_USER_FAILED,
});

export const registerUserRequested = (
  user: UserRegisterData,
): RegisterUserRequestedAction => ({
  type: UserActionTypes.REGISTER_USER_REQUESTED,
  payload: {
    user,
  },
});

export const registerUserSucceeded = (
  user: User,
): RegisterUserSucceededAction => ({
  type: UserActionTypes.REGISTER_USER_SUCCEEDED,
  payload: {
    user,
  },
});

export const registerUserFailed = (): RegisterUserFailedAction => ({
  type: UserActionTypes.REGISTER_USER_FAILED,
});

export const authenticationSucceeded = (
  user: User,
): AuthenticationSucceededAction => ({
  type: UserActionTypes.AUTHENTICATION_SUCCEEDED,
  payload: {
    user,
  },
});

export const logoutUser = (): LogoutUserAction => ({
  type: UserActionTypes.LOGOUT_USER,
});

export const setToken = (token: string): SetTokenAction => ({
  type: UserActionTypes.SET_TOKEN,
  payload: {
    token,
  },
});
