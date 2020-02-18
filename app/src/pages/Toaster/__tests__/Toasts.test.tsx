import { fakeToaster } from '../../../../test/fixtures/toaster/fakeToaster';
import { renderWithStyles } from '../../../../test/utils/renderWithStyles';
import Toasts from '../Toasts';
import React from 'react';

const props = {
  toastData: [fakeToaster],
  removeToast: jest.fn(),
};

describe('Toasts Component', () => {
  it('Should display snackbar', () => {
    const { getByText } = renderWithStyles(<Toasts {...props} />);

    const snackbar = getByText(fakeToaster.message);

    expect(snackbar).toBeInTheDocument();
  });
});
