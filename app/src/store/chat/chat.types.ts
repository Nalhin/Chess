import { ChatMessage } from '../../interfaces/Chat/ChatMessage';

export interface ChatState {
  readonly messages: ChatMessage[];
  readonly id: string;
}

enum ChatSubscriptionActionTypes {
  NEW_MESSAGE_RECEIVED = 'NEW_MESSAGE_RECEIVED',
}

enum ChatBaseActionTypes {
  INIT_CHAT = 'INIT_CHAT',
  CLOSE_CHAT = 'CLOSE_CHAT',
  SEND_MESSAGE = 'SEND_MESSAGE',
}

export const ChatActionTypes = {
  ...ChatSubscriptionActionTypes,
  ...ChatBaseActionTypes,
};

export interface NewMessageReceivedAction {
  type: ChatSubscriptionActionTypes.NEW_MESSAGE_RECEIVED;
  payload: {
    message: ChatMessage;
  };
}

export interface InitChatAction {
  type: ChatBaseActionTypes.INIT_CHAT;
  payload: {
    chatId: string;
  };
}

export interface CloseChatAction {
  type: ChatBaseActionTypes.CLOSE_CHAT;
}

export interface SendMessageAction {
  type: ChatBaseActionTypes.SEND_MESSAGE;
  payload: {
    content: string;
  };
}

export type ChatActions =
  | NewMessageReceivedAction
  | InitChatAction
  | CloseChatAction
  | SendMessageAction;
