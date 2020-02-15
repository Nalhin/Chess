import {
  User,
  UserLoginData,
  UserRegisterData,
} from '../../interfaces/User/User';

export interface UserState {
  readonly data: {
    login: string;
    email: string;
    token: string;
  };
}

export enum UserActionTypes {
  LOGIN_USER_REQUESTED = 'LOGIN_USER_REQUESTED',
  LOGIN_USER_SUCCEEDED = 'LOGIN_USER_SUCCEEDED',
  LOGIN_USER_FAILED = 'LOGIN_USER_FAILED',
  REGISTER_USER_REQUESTED = 'REGISTER_USER_REQUESTED',
  REGISTER_USER_SUCCEEDED = 'REGISTER_USER_SUCCEEDED',
  REGISTER_USER_FAILED = 'REGISTER_USER_FAILED',
  AUTHENTICATION_SUCCEEDED = 'AUTHENTICATION_SUCCEEDED',
  LOGOUT_USER = 'LOGOUT_USER',
  SET_TOKEN = 'SET_TOKEN',
}

export interface LoginUserRequestedAction {
  type: typeof UserActionTypes.LOGIN_USER_REQUESTED;
  payload: {
    user: UserLoginData;
  };
}

export interface LoginUserSucceededAction {
  type: typeof UserActionTypes.LOGIN_USER_SUCCEEDED;
  payload: {
    user: User;
  };
}

export interface LoginUserFailedAction {
  type: typeof UserActionTypes.LOGIN_USER_FAILED;
}

export interface RegisterUserRequestedAction {
  type: typeof UserActionTypes.REGISTER_USER_REQUESTED;
  payload: {
    user: UserRegisterData;
  };
}

export interface RegisterUserSucceededAction {
  type: typeof UserActionTypes.REGISTER_USER_SUCCEEDED;
  payload: {
    user: User;
  };
}

export interface RegisterUserFailedAction {
  type: typeof UserActionTypes.REGISTER_USER_FAILED;
}

export interface AuthenticationSucceededAction {
  type: typeof UserActionTypes.AUTHENTICATION_SUCCEEDED;
  payload: {
    user: User;
  };
}

export interface LogoutUserAction {
  type: typeof UserActionTypes.LOGOUT_USER;
}

export interface SetTokenAction {
  type: typeof UserActionTypes.SET_TOKEN;
  payload: {
    token: string;
  };
}

export type UserActions =
  | LoginUserRequestedAction
  | LoginUserSucceededAction
  | LoginUserFailedAction
  | RegisterUserRequestedAction
  | RegisterUserSucceededAction
  | RegisterUserFailedAction
  | AuthenticationSucceededAction
  | LogoutUserAction
  | SetTokenAction;
