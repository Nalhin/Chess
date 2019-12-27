import { Reducer } from 'react';
import { UserActions, UserActionTypes, UserState } from './user.types';
import produce from 'immer';

export const USER_INITIAL_STATE = {
  login: '',
  email: '',
};

const userReducer: Reducer<UserState, UserActions> = (
  state = USER_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case UserActionTypes.LOGIN_USER_REQUESTED:
        break;
      case UserActionTypes.LOGIN_USER_SUCCEEDED:
      case UserActionTypes.REGISTER_USER_SUCCEEDED:
        draft.login = action.payload.user.login;
        draft.email = action.payload.user.email;
        break;
      case UserActionTypes.LOGIN_USER_FAILED:
        break;
      case UserActionTypes.REGISTER_USER_REQUESTED:
        break;
      case UserActionTypes.REGISTER_USER_FAILED:
        break;
      default:
        break;
    }
  });
};

export default userReducer;
