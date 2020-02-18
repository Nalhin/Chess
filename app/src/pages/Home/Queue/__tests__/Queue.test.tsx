import { render } from '@testing-library/react';
import Queue from '../Queue';
import React from 'react';

const props = {
  joinQueue: jest.fn(),
  isInQueue: false,
  isReconnectShown: false,
  reconnectToGame: jest.fn(),
  checkIsGamePresent: jest.fn(),
  leaveQueue: jest.fn(),
  timeJoined: '',
  joinQueueAi: jest.fn(),
  isUserLoggedIn: false,
};

describe('Queue component', () => {
  it('should fire checkIsGamePresent event', () => {
    const checkIsGamePresent = jest.fn();
    const {} = render(
      <Queue
        {...props}
        checkIsGamePresent={checkIsGamePresent}
        isUserLoggedIn
      />,
    );

    expect(checkIsGamePresent).toHaveBeenCalledTimes(1);
  });

  it('should display queue status', () => {
    const { getByTestId } = render(<Queue {...props} isInQueue />);

    expect(getByTestId(/queue__status/i)).toBeInTheDocument();
  });

  it('should display queue reconnect', () => {
    const { getByTestId } = render(<Queue {...props} isReconnectShown />);

    expect(getByTestId(/queue__reconnect/i)).toBeInTheDocument();
  });

  it('should display join queue', () => {
    const { getByTestId } = render(
      <Queue {...props} isInQueue={false} isReconnectShown={false} />,
    );

    expect(getByTestId(/queue__join/i)).toBeInTheDocument();
  });
});
