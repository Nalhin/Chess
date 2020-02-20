import { renderWithStore } from '../../../../test/utils/renderWithStore';
import GameRoom from '../GameRoom';
import React from 'react';

const props = {
  isGameLoading: false,
  shouldReconnect: false,
  reconnectToGame: jest.fn(),
};

describe('GameRoom component', () => {
  it('should display loading', () => {
    const { getByText } = renderWithStore(
      <GameRoom {...props} isGameLoading />,
    );

    expect(getByText(/loading/i)).toBeInTheDocument();
  });
  it('should hide loading', () => {
    const { queryByText } = renderWithStore(
      <GameRoom {...props} isGameLoading={false} />,
    );

    expect(queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
