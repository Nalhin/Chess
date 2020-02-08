import { AppState } from '../rootReducer';

export const chatMessagesSelector = (state: AppState) =>
  [...state.chat.messages].reverse();
