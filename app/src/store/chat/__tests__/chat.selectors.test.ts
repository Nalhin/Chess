import { fakeChatMessage } from '../../../../test/fixtures/chat/chatMessage';
import { ChatMessageTypes } from '../../../interfaces/Chat/ChatMessage';
import { fakeUser } from '../../../../test/fixtures/user/user';
import { chatMessagesSelector } from '../chat.selectors';

describe('chatMessageSelector', () => {
  it('Should filter and reverse messages properly', () => {
    const sender = fakeUser.login;
    const infoMessageSameUser = {
      ...fakeChatMessage,
      sender,
      type: ChatMessageTypes.InfoMessage,
    };
    const infoMessageDifferentUser = {
      ...fakeChatMessage,
      type: ChatMessageTypes.InfoMessage,
      sender: '',
    };
    const chatMessage = {
      ...fakeChatMessage,
      type: ChatMessageTypes.ChatMessage,
    };
    const expected = [chatMessage, infoMessageDifferentUser];

    const fakeChatMessages = [
      infoMessageSameUser,
      infoMessageDifferentUser,
      chatMessage,
    ];

    const selected = chatMessagesSelector.resultFunc(
      fakeChatMessages,
      fakeUser,
    );

    expect(selected).toEqual(expected);
  });
});
