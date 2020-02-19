import { renderWithStore } from '../../../../test/utils/renderWithStore';
import React from 'react';
import SignUp from '../SignUp';
import { fireEvent } from '@testing-library/react';
import { fakeRegisterUser } from '../../../../test/fixtures/user/fakeUser';
import { registerUserRequested } from '../../../store/user/user.actions';
import { ToasterActionTypes } from '../../../store/toaster/toaster.types';

describe('SignUp page', () => {
  it('should dispatch register user action', () => {
    const { getByTestId, getByLabelText, store } = renderWithStore(<SignUp />);
    store.dispatch = jest.fn();

    fireEvent.change(getByLabelText(/login/i), {
      target: { value: fakeRegisterUser.login },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: fakeRegisterUser.email },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: fakeRegisterUser.password },
    });
    fireEvent.click(getByTestId(/sign-up__button/i));

    expect(store.dispatch).toHaveBeenCalledWith(
      registerUserRequested(fakeRegisterUser),
    );
  });
  it('should add toast, if there is an empty field', () => {
    const { getByTestId, getByLabelText, store } = renderWithStore(<SignUp />);
    store.dispatch = jest.fn();

    fireEvent.change(getByLabelText(/login/i), {
      target: { value: fakeRegisterUser.login },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: fakeRegisterUser.email },
    });
    fireEvent.click(getByTestId(/sign-up__button/i));

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: ToasterActionTypes.ADD_TOAST }),
    );
  });

  it('should allow submitting sign up form with enter', () => {
    const { getByLabelText, store } = renderWithStore(<SignUp />);
    store.dispatch = jest.fn();

    fireEvent.change(getByLabelText(/login/i), {
      target: { value: fakeRegisterUser.login },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: fakeRegisterUser.email },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: fakeRegisterUser.password },
    });
    fireEvent.keyDown(getByLabelText(/password/i), { key: 'Enter' });

    expect(store.dispatch).toHaveBeenCalledWith(
      registerUserRequested(fakeRegisterUser),
    );
  });
});
