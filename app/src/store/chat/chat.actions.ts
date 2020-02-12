import { ChatMessage } from '../../interfaces/Chat/ChatMessage';
import {
  ChatActionTypes,
  CloseChatAction,
  InitChatAction,
  NewMessageReceivedAction,
  SendMessageAction,
} from './chat.types';

export const newMessageReceived = (
  message: ChatMessage,
): NewMessageReceivedAction => ({
  type: ChatActionTypes.NEW_MESSAGE_RECEIVED,
  payload: {
    message,
  },
});

export const initChat = (chatId: string): InitChatAction => ({
  type: ChatActionTypes.INIT_CHAT,
  payload: {
    chatId,
  },
});

export const closeChat = (): CloseChatAction => ({
  type: ChatActionTypes.CLOSE_CHAT,
});

export const sendMessage = (content: string): SendMessageAction => ({
  type: ChatActionTypes.SEND_MESSAGE,
  payload: {
    content,
  },
});
