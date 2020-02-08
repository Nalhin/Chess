import { ChatMessage } from '../../interfaces/Chat/ChatMessage';
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

export const initChat = (chatId: string): InitChatAction => ({
  type: ChatBaseActionTypes.INIT_CHAT,
  payload: {
    chatId,
  },
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
