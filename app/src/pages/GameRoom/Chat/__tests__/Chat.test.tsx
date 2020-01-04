import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import { fakeChatMessage } from '../../../../../test/fixtures/chat/chatMessage';
import Chat from '../Chat';
import { renderWithStyles } from '../../../../../test/utils/renderWithStyles';

const props = {
  chatMessages: [fakeChatMessage],
  sendMessage: jest.fn(),
  userLogin: '',
};

describe('Chat Component', () => {
  it('Should allow sending messages and clear input on send', () => {
    const sendMessage = jest.fn();
    const fakeMessageContent = 'test';

    const { getByTestId, queryByText } = renderWithStyles(
      <Chat {...props} sendMessage={sendMessage} />,
    );

    const messageInput = getByTestId('chat_message-input');
    fireEvent.change(messageInput, {
      target: { value: fakeMessageContent },
    });

    const sendMessageButton = getByTestId('chat__send-message-button');
    fireEvent.click(sendMessageButton);

    expect(sendMessage).toBeCalledWith(fakeMessageContent);
    expect(queryByText(fakeMessageContent)).toBeFalsy();
  });

  it('Should display messages', () => {
    const fakeChatMessages = [
      fakeChatMessage,
      { ...fakeChatMessage, sendDate: '21:38', id: '123' },
    ];
    const { getAllByTestId } = renderWithStyles(
      <Chat {...props} chatMessages={fakeChatMessages} />,
    );

    const messages = getAllByTestId('chat__chat-message');

    expect(fakeChatMessages.length).toEqual(messages.length);
  });
});
