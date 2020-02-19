import { fakeMatchDetails } from '../../../../test/fixtures/matchHistory/fakeMatchDetails';
import { fakeUser } from '../../../../test/fixtures/user/fakeUser';
import MatchDetailsPage from '../MatchDetailsPage';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';
import { Routes } from '../../../interfaces/Router/Routes';
import React from 'react';
import { fireEvent } from '@testing-library/react';

const matchId = 1;
const props = {
  isLoading: false,
  matchDetails: { [matchId]: fakeMatchDetails },
  getMatchDetails: jest.fn(),
  user: fakeUser,
  shouldDisplayBackButton: false,
};

const route = `${Routes.matchDetails}${matchId}`;
const path = `${Routes.matchDetails}:id`;

describe('MatchDetailsPage', () => {
  it('should display match details', () => {
    const matchDetails = { [matchId]: fakeMatchDetails };
    const { container } = renderWithRouter(
      <MatchDetailsPage
        {...props}
        isLoading={false}
        matchDetails={matchDetails}
      />,
      {
        route,
        path,
      },
    );

    expect(container.innerHTML).toMatch(fakeMatchDetails.blackPlayer);
  });
  it('should fire getMatchDetails', () => {
    const matchDetails = {};
    const getMatchDetails = jest.fn();
    const {} = renderWithRouter(
      <MatchDetailsPage
        {...props}
        isLoading={false}
        matchDetails={matchDetails}
        getMatchDetails={getMatchDetails}
      />,
      {
        route,
        path,
      },
    );
    expect(getMatchDetails).toHaveBeenCalledWith(matchId);
  });

  it('should allow going back in router history', () => {
    const { getByLabelText, history } = renderWithRouter(
      <MatchDetailsPage {...props} shouldDisplayBackButton />,
      {
        route,
        path,
      },
    );
    history.goBack = jest.fn();

    fireEvent.click(getByLabelText(/go back/i));

    expect(history.goBack).toHaveBeenCalledTimes(1);
  });
  it('should display not found', () => {
    const matchDetails = {};
    const { container } = renderWithRouter(
      <MatchDetailsPage
        {...props}
        isLoading={false}
        matchDetails={matchDetails}
      />,
      {
        route,
        path,
      },
    );

    expect(container.innerHTML).toMatch('not found');
  });
});
