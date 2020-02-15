import { AppState } from '../rootReducer';
import { ChatMessageTypes } from '../../interfaces/Chat/ChatMessage';
import { createSelector } from 'reselect';
import { userSelector } from '../user/user.selectors';

export const chatUnmodifiedMessagesSelector = (state: AppState) =>
  state.chat.messages;

export const chatMessagesSelector = createSelector(
  chatUnmodifiedMessagesSelector,
  userSelector,
  (messages, user) => {
    return messages
      .filter(
        message =>
          message.type !== ChatMessageTypes.InfoMessage ||
          message.sender !== user.login,
      )
      .reverse();
  },
);
