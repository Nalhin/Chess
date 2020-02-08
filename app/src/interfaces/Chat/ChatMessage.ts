export interface ChatMessage {
  content: string;
  sender: string;
  sendDate: string;
  type: ChatMessageTypes;
  id: string;
}

export enum ChatMessageTypes {
  ChatMessage = 'ChatMessage',
  InfoMessage = 'InfoMessage',
}
