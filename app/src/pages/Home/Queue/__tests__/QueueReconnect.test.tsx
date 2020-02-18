import { fireEvent, render } from '@testing-library/react';
import QueueReconnect from '../QueueReconnect';
import React from 'react';

describe('QueueReconnect component', () => {
  it('should fire reconnect event on click', () => {
    const reconnectToGame = jest.fn();
    const { getByText } = render(
      <QueueReconnect reconnectToGame={reconnectToGame} />,
    );

    fireEvent.click(getByText(/reconnect/i));

    expect(reconnectToGame).toHaveBeenCalledTimes(1);
  });
});
