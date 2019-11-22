import { ChatMessage } from '../../inferfaces/chatMessage';

export interface ChatState {
  readonly messages: ChatMessage[];
}

export enum ChatSubscriptionActionTypes {
  NEW_MESSAGE_RECEIVED = 'NEW_MESSAGE_RECEIVED',
}

export interface NewMessageReceivedAction {
  type: ChatSubscriptionActionTypes.NEW_MESSAGE_RECEIVED;
  payload: {
    message: ChatMessage;
  };
}

export enum ChatBaseActionTypes {
  INIT_CHAT = 'INIT_CHAT',
  CLOSE_CHAT = 'CLOSE_CHAT',
  SEND_MESSAGE = 'SEND_MESSAGE',
}

export interface InitChatAction {
  type: ChatBaseActionTypes.INIT_CHAT;
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

export const ChatActionTypes = {
  ...ChatSubscriptionActionTypes,
  ...ChatBaseActionTypes,
};

export type ChatActions = NewMessageReceivedAction;
