import { ChatMessageTypes } from '../../../src/interfaces/Chat/ChatMessage';

export const fakeChatMessage = {
  content: 'fake content',
  sender: 'fake player',
  sendDate: new Date().toISOString(),
  type: ChatMessageTypes.ChatMessage,
  id:
    Math.random()
      .toString(36)
      .substring(2, 15) + Math.random(),
};
