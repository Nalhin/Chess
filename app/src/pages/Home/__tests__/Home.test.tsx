import { renderWithRouter } from '../../../../test/utils/renderWithRouter';
import Home from '../Home';
import React from 'react';
import { renderWithStore } from '../../../../test/utils/renderWithStore';

const props = {
  isAuthenticated: false,
  registerUser: jest.fn(),
};

describe('Home Page', () => {
  it('should display info, if user is not authenticated', () => {
    const isAuthenticated = false;
    const { getByTestId } = renderWithRouter(
      <Home {...props} isAuthenticated={isAuthenticated} />,
    );

    expect(getByTestId(/info/i)).toBeTruthy();
  });
  it('should display queue, if user is authenticated', () => {
    const isAuthenticated = true;
    const { getByTestId } = renderWithStore(
      <Home {...props} isAuthenticated={isAuthenticated} />,
    );

    expect(getByTestId(/queue/i)).toBeTruthy();
  });
});
