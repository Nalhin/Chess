import { ChatMessage } from '../../inferfaces/chatMessage';

export interface ChatState {
  readonly messages: ChatMessage[];
}

export enum ChatSubscriptionActionTypes {
  NEW_MESSAGE_RECEIVED = 'NEW_MESSAGE_RECEIVED',
}

export enum ChatBaseActionTypes {
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

export type ChatActions = NewMessageReceivedAction;
