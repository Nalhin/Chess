// @ts-nocheck
import { fireEvent, render, waitForElement } from '@testing-library/react';
import UserImageForm from '../UserImageForm';
import { fakeUser } from '../../../../test/fixtures/user/fakeUser';
import React from 'react';
import * as userApi from '../../../store/user/user.api';
import { ToastTypes } from '../../../interfaces/Toaster/ToastTypes';

jest.mock('../../../store/user/user.api', () => ({
  fetchSaveImage: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('UserImageForm', () => {
  it('should allow saving image', async () => {
    const file = new File(['(⌐□_□)'], 'file', { type: 'image/png' });
    const addToast = jest.fn();
    const { getByText, getByLabelText } = render(
      <UserImageForm user={fakeUser} addToast={addToast} />,
    );
    const saveButton = getByText(/save/i);

    fireEvent.change(getByLabelText(/change avatar/i), {
      target: { files: [file] },
    });
    expect(saveButton.closest('button')).not.toBeDisabled();
    fireEvent.click(saveButton);

    await waitForElement(() => saveButton, {
      mutationObserverOptions: { attributes: true },
    });

    expect(userApi.fetchSaveImage).toHaveBeenCalledTimes(1);
    expect(addToast).toHaveBeenCalledWith(
      expect.objectContaining({
        type: ToastTypes.Success,
      }),
    );
  });
  it('should display error, if request is rejected', async () => {
    const file = new File(['(⌐□_□)'], 'file', { type: 'image/png' });
    const addToast = jest.fn();
    userApi.fetchSaveImage.mockImplementation(() => {
      throw Error();
    });
    const { getByText, getByLabelText } = render(
      <UserImageForm user={fakeUser} addToast={addToast} />,
    );
    const saveButton = getByText(/save/i);

    fireEvent.change(getByLabelText(/change avatar/i), {
      target: { files: [file] },
    });
    expect(saveButton.closest('button')).not.toBeDisabled();
    fireEvent.click(saveButton);

    expect(userApi.fetchSaveImage).toHaveBeenCalledTimes(1);
    expect(addToast).toHaveBeenCalledWith(
      expect.objectContaining({
        type: ToastTypes.Error,
      }),
    );
  });
});
