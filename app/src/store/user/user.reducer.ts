import { Reducer } from 'react';
import { UserState } from './user.types';

const userName = Math.random()
  .toString(36)
  .substring(7);

export const USER_INITIAL_STATE = {
  name: userName,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userReducer: Reducer<UserState, any> = (
  state = USER_INITIAL_STATE,
  action,
) => {
  return state;
};

export default userReducer;
