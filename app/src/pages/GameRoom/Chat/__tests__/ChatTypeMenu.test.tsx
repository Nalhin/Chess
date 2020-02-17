import { fireEvent, render } from '@testing-library/react';
import ChatTypeMenu from '../ChatTypeMenu';
import React from 'react';

describe('ChatTypeMenu component', () => {
  it('should allow sending message with button', () => {
    const sendMessage = jest.fn();
    const message = 'message';
    const { getByLabelText, getByPlaceholderText } = render(
      <ChatTypeMenu sendMessage={sendMessage} />,
    );

    fireEvent.change(getByPlaceholderText(/type a message/i), {
      target: { value: message },
    });
    fireEvent.click(getByLabelText(/send message/));

    expect(sendMessage).toHaveBeenCalledWith(message);
  });
  it('should allow sending message with enter', () => {
    const sendMessage = jest.fn();
    const message = 'message';
    const { getByPlaceholderText } = render(
      <ChatTypeMenu sendMessage={sendMessage} />,
    );

    const typeInput = getByPlaceholderText(/type a message/i);
    fireEvent.change(typeInput, {
      target: { value: message },
    });
    fireEvent.keyDown(typeInput, { key: 'Enter' });

    expect(sendMessage).toHaveBeenCalledWith(message);
  });
});
