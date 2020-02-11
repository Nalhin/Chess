import { AppState } from '../rootReducer';

export const userSelector = (state: AppState) => state.user.data;

export const isAuthenticatedSelector = (state: AppState): boolean =>
  !!state.user.data.token;
