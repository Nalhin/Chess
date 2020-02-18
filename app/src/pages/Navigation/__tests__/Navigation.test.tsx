import { fireEvent } from '@testing-library/react';
import Navigation from '../Navigation';
import React from 'react';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';

const props = {
  isAuthenticated: false,
  logoutUser: jest.fn(),
};

describe('Navigation component', () => {
  it('should allow user to change theme', () => {
    const { getByLabelText, changeColorTheme } = renderWithRouter(
      <Navigation {...props} />,
    );

    fireEvent.click(getByLabelText(/change color theme/i));

    expect(changeColorTheme).toHaveBeenCalledTimes(1);
  });
  it('should allow user to logout', () => {
    const logoutUser = jest.fn();
    const { getByLabelText, getByText } = renderWithRouter(
      <Navigation {...props} isAuthenticated logoutUser={logoutUser} />,
    );

    fireEvent.click(getByLabelText(/user menu/i));
    fireEvent.click(getByText(/logout/i));

    expect(logoutUser).toHaveBeenCalledTimes(1);
  });
  it('should open drawer menu', () => {
    const { getByLabelText, getByText } = renderWithRouter(
      <Navigation {...props} />,
    );

    fireEvent.click(getByLabelText(/drawer menu/i));

    expect(getByText(/play/i)).toBeInTheDocument();
  });

  it('should hide user menu, if user is not authenticated', () => {
    const { queryByText } = renderWithRouter(
      <Navigation {...props} isAuthenticated={false} />,
    );

    expect(queryByText(/user menu/i)).not.toBeInTheDocument();
  });
});
