import { fakeChatMessage } from '../../../../../test/fixtures/chat/chatMessage';
import { fakeUser } from '../../../../../test/fixtures/user/user';
import { render } from '@testing-library/react';
import Chat from '../Chat';
import React from 'react';

const props = {
  chatMessages: [fakeChatMessage],
  sendMessage: jest.fn(),
  userLogin: fakeUser.login,
};

describe('Chat component', () => {
  it('should display messages', () => {
    const messages = [fakeChatMessage];
    const { getByText } = render(<Chat {...props} chatMessages={messages} />);

    expect(getByText(messages[0].content)).toBeTruthy();
  });
});
