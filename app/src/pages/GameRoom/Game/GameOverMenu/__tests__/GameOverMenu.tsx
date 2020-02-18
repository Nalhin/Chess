import { renderWithRouter } from '../../../../../../test/utils/renderWithRouter';
import GameOverMenu from '../GameOverMenu';
import { fireEvent } from '@testing-library/react';
import React from 'react';
import { Routes } from '../../../../../interfaces/Router/Routes';

const props = {
  isShown: true,
  closeGame: jest.fn(),
  isWinner: true,
};

describe('GameOverMenu component', () => {
  it('should allow going back to main menu', () => {
    const closeGame = jest.fn();
    const { getByText, history } = renderWithRouter(
      <GameOverMenu {...props} closeGame={closeGame} isShown />,
    );

    fireEvent.click(getByText(/main menu/i));

    expect(history.location.pathname).toEqual(Routes.home);
    expect(closeGame).toHaveBeenCalledTimes(1);
  });
});
