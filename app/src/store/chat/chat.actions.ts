import { ChatMessage } from '../../inferfaces/chatMessage';
import {
  ChatSubscriptionActionTypes,
  NewMessageReceivedAction,
} from './chat.types';

export const newMessageReceived = (
  message: ChatMessage,
): NewMessageReceivedAction => ({
  type: ChatSubscriptionActionTypes.NEW_MESSAGE_RECEIVED,
  payload: {
    message,
  },
});
