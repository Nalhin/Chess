import { render } from '@testing-library/react';
import MatchDetails from '../MatchDetails';
import { fakeMatchDetails } from '../../../../test/fixtures/matchHistory/fakeMatchDetails';
import { fakeUser } from '../../../../test/fixtures/user/user';
import React from 'react';

describe('MatchDetails component', () => {
  it('should display match data', () => {
    const game = fakeMatchDetails;
    const login = fakeUser.login;
    const { getByText } = render(<MatchDetails game={game} login={login} />);

    expect(getByText(game.blackPlayer)).toBeTruthy();
    expect(getByText(game.whitePlayer)).toBeTruthy();
  });
});
