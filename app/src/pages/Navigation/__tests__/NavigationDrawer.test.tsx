import { renderWithRouter } from '../../../../test/utils/renderWithRouter';

import React from 'react';
import NavigationDrawer from '../NavigationDrawer';
import { fireEvent } from '@testing-library/react';
import { Routes } from '../../../interfaces/Router/Routes';

const props = {
  isOpen: true,
  toggleDrawer: jest.fn(),
  isAuthenticated: true,
  logoutUser: jest.fn(),
};

describe('NavigationDrawer component', () => {
  it('should redirect to home', () => {
    const { history, getByText } = renderWithRouter(
      <NavigationDrawer {...props} />,
    );

    fireEvent.click(getByText(/play/i));

    expect(history.location.pathname).toEqual(Routes.home);
  });
  it('should redirect to match history', () => {
    const { history, getByText } = renderWithRouter(
      <NavigationDrawer {...props} isAuthenticated />,
    );

    fireEvent.click(getByText(/match history/i));

    expect(history.location.pathname).toEqual(Routes.matchHistory);
  });
  it('should logout user', () => {
    const logoutUser = jest.fn();
    const { getByText } = renderWithRouter(
      <NavigationDrawer {...props} logoutUser={logoutUser} isAuthenticated />,
    );

    fireEvent.click(getByText(/logout/i));

    expect(logoutUser).toHaveBeenCalledTimes(1);
  });
  it('should redirect to login', () => {
    const { history, getByText } = renderWithRouter(
      <NavigationDrawer {...props} isAuthenticated={false} />,
    );

    fireEvent.click(getByText(/login/i));

    expect(history.location.pathname).toEqual(Routes.login);
  });
  it('should redirect to sign up', () => {
    const { history, getByText } = renderWithRouter(
      <NavigationDrawer {...props} isAuthenticated={false} />,
    );

    fireEvent.click(getByText(/sign up/i));

    expect(history.location.pathname).toEqual(Routes.signUp);
  });
});
