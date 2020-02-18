import React from 'react';
import QueueJoin from '../QueueJoin';
import { fireEvent, render, waitForElement } from '@testing-library/react';

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

  it('should allow joining ai queue', async () => {
    const joinQueueAi = jest.fn();
    const { getByText, getByLabelText } = render(
      <QueueJoin {...props} joinQueueAi={joinQueueAi} />,
    );

    fireEvent.mouseDown(getByLabelText(/mode/i));
    const aiOption = await waitForElement(() => getByText(/ai/i));
    fireEvent.click(aiOption);
    fireEvent.click(getByText(/find match/i));

    expect(joinQueueAi).toHaveBeenCalledTimes(1);
  });
});
