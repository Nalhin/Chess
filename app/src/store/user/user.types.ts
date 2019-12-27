import { User, UserLoginData, UserRegisterData } from '../../interfaces/User';

export interface UserState {
  readonly login: string;
  readonly email: string;
}

export enum UserActionTypes {
  LOGIN_USER_REQUESTED = 'LOGIN_USER_REQUESTED',
  LOGIN_USER_SUCCEEDED = 'LOGIN_USER_SUCCEEDED',
  LOGIN_USER_FAILED = 'LOGIN_USER_FAILED',
  REGISTER_USER_REQUESTED = 'REGISTER_USER_REQUESTED',
  REGISTER_USER_SUCCEEDED = 'REGISTER_USER_SUCCEEDED',
  REGISTER_USER_FAILED = 'REGISTER_USER_FAILED',
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
  payload: {
    error: string;
  };
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
  payload: {
    error: string;
  };
}

export type UserActions =
  | LoginUserRequestedAction
  | LoginUserSucceededAction
  | LoginUserFailedAction
  | RegisterUserRequestedAction
  | RegisterUserSucceededAction
  | RegisterUserFailedAction;
