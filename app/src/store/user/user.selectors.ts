import { AppState } from '../rootReducer';

export const userSelector = (state: AppState) => state.user.data;

export const isAuthenticatedSelector = (state: AppState) =>
  !!state.user.data.token;

export const isUserLoggedInSelector = (state: AppState) =>
  !!state.user.data.login && !!state.user.data.email;
