import { Reducer } from 'react';
import { UserActions, UserActionTypes, UserState } from './user.types';
import produce from 'immer';

export const USER_INITIAL_STATE = {
  data: {
    login: '',
    email: '',
    token: '',
  },
  isLoading: false,
};

const userReducer: Reducer<UserState, UserActions> = (
  state = USER_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case UserActionTypes.LOGIN_USER_REQUESTED:
      case UserActionTypes.REGISTER_USER_REQUESTED:
        draft.isLoading = true;
        break;
      case UserActionTypes.LOGIN_USER_SUCCEEDED:
      case UserActionTypes.REGISTER_USER_SUCCEEDED:
      case UserActionTypes.AUTHENTICATION_SUCCEEDED:
        draft.data.login = action.payload.user.login;
        draft.data.email = action.payload.user.email;
        draft.data.token = action.payload.user.token;
        draft.isLoading = false;
        break;
      case UserActionTypes.REGISTER_USER_FAILED:
      case UserActionTypes.LOGIN_USER_FAILED:
        draft.isLoading = false;
        break;
      case UserActionTypes.SET_TOKEN:
        draft.data.token = action.payload.token;
        break;
      case UserActionTypes.LOGOUT_USER:
        draft.data = USER_INITIAL_STATE.data;
        break;
      default:
        break;
    }
  });
};

export default userReducer;
