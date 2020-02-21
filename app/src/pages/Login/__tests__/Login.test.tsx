import { renderWithStore } from '../../../../test/utils/renderWithStore';
import { fireEvent } from '@testing-library/react';
import { fakeLoginUser } from '../../../../test/fixtures/user/fakeUser';
import { loginUserRequested } from '../../../store/user/user.actions';
import { ToasterActionTypes } from '../../../store/toaster/toaster.types';
import React from 'react';
import Login from '../Login';

describe('Login page', () => {
  it('should dispatch login user action', () => {
    const { getByText, getByLabelText, store } = renderWithStore(<Login />);
    store.dispatch = jest.fn();

    fireEvent.change(getByLabelText(/login/i), {
      target: { value: fakeLoginUser.login },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: fakeLoginUser.password },
    });
    fireEvent.click(getByText(/continue/i));

    expect(store.dispatch).toHaveBeenCalledWith(
      loginUserRequested(fakeLoginUser),
    );
  });
  it('should add toast, if there is an empty field', () => {
    const { getByText, getByLabelText, store } = renderWithStore(<Login />);
    store.dispatch = jest.fn();

    fireEvent.change(getByLabelText(/login/i), {
      target: { value: fakeLoginUser.login },
    });
    fireEvent.click(getByText(/continue/i));

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: ToasterActionTypes.ADD_TOAST }),
    );
  });

  it('should allow submitting login form with enter', () => {
    const { getByLabelText, store } = renderWithStore(<Login />);
    store.dispatch = jest.fn();

    fireEvent.change(getByLabelText(/login/i), {
      target: { value: fakeLoginUser.login },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: fakeLoginUser.password },
    });
    fireEvent.keyDown(getByLabelText(/password/i), { key: 'Enter' });

    expect(store.dispatch).toHaveBeenCalledWith(
      loginUserRequested(fakeLoginUser),
    );
  });
});
