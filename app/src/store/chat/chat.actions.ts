import { ChatMessage } from '../../inferfaces/chatMessage';
import {
  ChatBaseActionTypes,
  ChatSubscriptionActionTypes,
  CloseChatAction,
  InitChatAction,
  NewMessageReceivedAction,
  SendMessageAction,
} from './chat.types';

export const newMessageReceived = (
  message: ChatMessage,
): NewMessageReceivedAction => ({
  type: ChatSubscriptionActionTypes.NEW_MESSAGE_RECEIVED,
  payload: {
    message,
  },
});

export const initChat = (): InitChatAction => ({
  type: ChatBaseActionTypes.INIT_CHAT,
});

export const closeChat = (): CloseChatAction => ({
  type: ChatBaseActionTypes.CLOSE_CHAT,
});

export const sendMessage = (content: string): SendMessageAction => ({
  type: ChatBaseActionTypes.SEND_MESSAGE,
  payload: {
    content,
  },
});
