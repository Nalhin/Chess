import { fakeMatchHistory } from '../../../../test/fixtures/matchHistory/fakeMatchHistory';
import { fakeUser } from '../../../../test/fixtures/user/user';
import MatchHistoryGame from '../MatchHistoryGame';
import React from 'react';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';
import { fireEvent } from '@testing-library/react';
import { Routes } from '../../../interfaces/Router/Routes';

const props = {
  game: fakeMatchHistory[0],
  login: fakeUser.login,
};

describe('MatchHistoryGame component', () => {
  it('should display game data', () => {
    const game = fakeMatchHistory[0];

    const { getByText } = renderWithRouter(
      <MatchHistoryGame {...props} game={game} />,
    );

    expect(getByText(game.whitePlayer)).toBeInTheDocument();
    expect(getByText(game.blackPlayer)).toBeInTheDocument();
  });
  it('should redirect to MatchDetails on click', () => {
    const game = fakeMatchHistory[0];
    const { getByText, history } = renderWithRouter(
      <MatchHistoryGame {...props} game={game} />,
    );

    fireEvent.click(getByText(game.whitePlayer));

    expect(history.location.pathname).toEqual(
      `${Routes.matchHistory}/${game.gameId}`,
    );
  });
});
