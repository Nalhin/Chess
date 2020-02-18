import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import ChatActionButton from '../ChatActionButton';

const props = {
  isDisplayed: true,
  handleClick: jest.fn(),
  messageCount: 2,
};

describe('ChatActionButton', () => {
  it('should fire on click event', () => {
    const handleClick = jest.fn();
    const { getByLabelText } = render(
      <ChatActionButton {...props} handleClick={handleClick} />,
    );

    fireEvent.click(getByLabelText(/toggle chat/i));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it('should display new message count', () => {
    let messageCount = 4;
    const { getByText, rerender } = render(
      <ChatActionButton {...props} messageCount={messageCount} />,
    );
    messageCount++;
    rerender(<ChatActionButton {...props} messageCount={messageCount} />);

    expect(getByText('2')).toBeInTheDocument();
  });
});
