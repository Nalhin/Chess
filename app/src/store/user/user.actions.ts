import { User, UserLoginData, UserRegisterData } from '../../interfaces/User';
import {
  LoginUserFailedAction,
  LoginUserRequestedAction,
  LoginUserSucceededAction,
  RegisterUserFailedAction,
  RegisterUserRequestedAction,
  RegisterUserSucceededAction,
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

export const loginUserFailedAction = (
  error: string,
): LoginUserFailedAction => ({
  type: UserActionTypes.LOGIN_USER_FAILED,
  payload: {
    error,
  },
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

export const registerUserFailedAction = (
  error: string,
): RegisterUserFailedAction => ({
  type: UserActionTypes.REGISTER_USER_FAILED,
  payload: {
    error,
  },
});
