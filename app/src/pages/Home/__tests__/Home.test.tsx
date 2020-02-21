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
    const { getByTestId } = renderWithStore(
      <Home {...props} isAuthenticated={isAuthenticated} />,
    );

    expect(getByTestId(/info/i)).toBeInTheDocument();
  });
  it('should display queue, if user is authenticated', () => {
    const isAuthenticated = true;
    const { getAllByTestId } = renderWithStore(
      <Home {...props} isAuthenticated={isAuthenticated} />,
    );

    expect(getAllByTestId(/queue/i)[0]).toBeInTheDocument();
  });
});
