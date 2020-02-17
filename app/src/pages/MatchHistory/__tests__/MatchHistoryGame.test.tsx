import { fakeMatchHistory } from '../../../../test/fixtures/matchHistory/fakeMatchHistory';
import { fakeUser } from '../../../../test/fixtures/user/user';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';
import MatchHistoryPage from '../MatchHistoryPage';
import React from 'react';

const props = {
  matches: fakeMatchHistory,
  getMatchHistory: jest.fn(),
  isLoading: false,
  user: fakeUser,
};

describe('MatchHistoryPage', () => {
  it('should display not found, if message list is empty', () => {
    const { getByText } = renderWithRouter(
      <MatchHistoryPage {...props} matches={[]} isLoading={false} />,
    );
    expect(getByText(/no matches found/i)).toBeTruthy();
  });
  it('should fire getMatchHistory action', () => {
    const getMatchHistory = jest.fn();
    const {} = renderWithRouter(
      <MatchHistoryPage
        {...props}
        getMatchHistory={getMatchHistory}
        matches={[]}
        user={fakeUser}
      />,
    );

    expect(getMatchHistory).toBeCalledWith(fakeUser.login);
  });
  it('should display matches', () => {
    const matches = fakeMatchHistory;
    const { getAllByText } = renderWithRouter(
      <MatchHistoryPage {...props} matches={fakeMatchHistory} />,
    );

    expect(getAllByText(matches[0].blackPlayer).length).toBeTruthy();
  });
});
