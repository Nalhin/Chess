import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import QueueStatus from '../QueueStatus';

const props = {
  timeJoined: '0',
  leaveQueue: jest.fn(),
};

describe('QueueStatus component', () => {
  it('should allow leaving queue', () => {
    const leaveQueue = jest.fn();
    const { getByText } = render(
      <QueueStatus {...props} leaveQueue={leaveQueue} />,
    );

    fireEvent.click(getByText(/leave/i));

    expect(leaveQueue).toHaveBeenCalledTimes(1);
  });

  it('should increase timer correctly', async () => {
    const timeJoined = new Date().toISOString();
    const { findByText } = render(
      <QueueStatus {...props} timeJoined={timeJoined} />,
    );

    expect(await findByText(/1/)).toBeInTheDocument();
  });
});
