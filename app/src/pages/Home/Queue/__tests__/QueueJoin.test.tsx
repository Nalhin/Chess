import React from 'react';
import QueueJoin from '../QueueJoin';
import { fireEvent, render } from '@testing-library/react';

const props = { joinQueue: jest.fn(), joinQueueAi: jest.fn() };

describe('QueueJoin component', () => {
  it('should allow joining queue', () => {
    const joinQueue = jest.fn();
    const { getByText } = render(
      <QueueJoin {...props} joinQueue={joinQueue} />,
    );

    fireEvent.click(getByText(/pvp/i));
    fireEvent.click(getByText(/find match/i));

    expect(joinQueue).toHaveBeenCalledTimes(1);
  });
});
