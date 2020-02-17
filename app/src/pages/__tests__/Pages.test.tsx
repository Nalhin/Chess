import { renderWithStore } from '../../../test/utils/renderWithStore';
import React from 'react';
import Pages from '../Pages';
import { Routes } from '../../interfaces/Router/Routes';
import { fakeUser } from '../../../test/fixtures/user/user';

describe('Pages Component', () => {
  it('should handle sign up route', async () => {
    const route = Routes.signUp;

    const { findByTestId } = renderWithStore(<Pages />, { route });

    expect(await findByTestId(route)).toBeTruthy();
  });

  it('should handle profile route', async () => {
    const route = Routes.profile;
    const initialState = { user: { data: fakeUser } };
    const { findByTestId } = renderWithStore(<Pages />, {
      route,
      initialState,
    });

    expect(await findByTestId(route)).toBeTruthy();
  });

  it('should handle invalid route', async () => {
    const route = 'not found';

    const { findByTestId } = renderWithStore(<Pages />, { route });

    expect(await findByTestId(route)).toBeTruthy();
  });

  it('should handle match history route', async () => {
    const route = Routes.matchHistory;
    const initialState = { user: { data: fakeUser } };

    const { findByTestId } = renderWithStore(<Pages />, {
      route,
      initialState,
    });

    expect(await findByTestId(route)).toBeTruthy();
  });

  it('should handle match details route', async () => {
    const route = `${Routes.matchDetails}id`;
    const initialState = { user: { data: fakeUser } };

    const { findByTestId } = renderWithStore(<Pages />, {
      route,
      initialState,
    });

    expect(await findByTestId(route)).toBeTruthy();
  });

  it('should handle logout route', async () => {
    const route = Routes.logout;

    const { findByTestId } = renderWithStore(<Pages />, { route });

    expect(await findByTestId(route)).toBeTruthy();
  });

  it('should handle login route', async () => {
    const route = Routes.login;

    const { findByTestId } = renderWithStore(<Pages />, { route });

    expect(await findByTestId(route)).toBeTruthy();
  });

  it('Should handle home route', async () => {
    const route = Routes.home;

    const { findByTestId } = renderWithStore(<Pages />, { route });

    expect(await findByTestId(route)).toBeTruthy();
  });

  it('should handle game route', async () => {
    const route = `${Routes.game}id`;
    const initialState = {
      user: { data: fakeUser },
    };

    const { findByTestId } = renderWithStore(<Pages />, {
      route,
      initialState,
    });

    expect(await findByTestId(route)).toBeTruthy();
  });
});
