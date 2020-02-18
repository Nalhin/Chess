import { fakeChatMessage } from '../../../../../test/fixtures/chat/chatMessage';
import { fakeUser } from '../../../../../test/fixtures/user/user';
import React from 'react';
import ChatUserMessage from '../ChatUserMessage';
import { render } from '@testing-library/react';

const props = {
  chatMessage: fakeChatMessage,
  userLogin: fakeUser.login,
};

describe('UserMessageComponent', () => {
  it('should display message content', () => {
    const { getByText } = render(<ChatUserMessage {...props} />);

    expect(getByText(fakeChatMessage.content)).toBeInTheDocument();
  });
});
