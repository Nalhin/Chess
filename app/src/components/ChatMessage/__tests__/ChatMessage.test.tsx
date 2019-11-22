import { fakeChatMessage } from '../../../../test/fixtures/chat/chatMessage';
import { fakeUser } from '../../../../test/fixtures/user/user';
import { render } from '@testing-library/react';
import ChatMessage from '../ChatMessage';
import * as React from 'react';
import { matchers } from 'jest-emotion';

expect.extend(matchers);

const props = {
  chatMessage: fakeChatMessage,
  user: fakeUser.name,
};

describe('ChatMessage Component', () => {
  it('Should change background, if user send the message', () => {
    const { getByTestId } = render(
      <ChatMessage {...props} user={fakeChatMessage.sender} />,
    );

    const message = getByTestId('chat__chat-message');
    expect(message).toHaveStyleRule('background', 'yellow');
  });
});
