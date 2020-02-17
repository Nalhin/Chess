import { renderWithRouter } from '../../../../test/utils/renderWithRouter';
import Logout from '../Logout';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Routes } from '../../../interfaces/Router/Routes';

describe('Logout page', () => {
  it('should redirect to login page', () => {
    const { getByText, history } = renderWithRouter(<Logout />);

    fireEvent.click(getByText(/home page/i));

    expect(history.location.pathname).toEqual(Routes.home);
  });
  it('should redirect to home page', () => {
    const { getByText, history } = renderWithRouter(<Logout />);

    fireEvent.click(getByText(/sign in/i));

    expect(history.location.pathname).toEqual(Routes.login);
  });
});
