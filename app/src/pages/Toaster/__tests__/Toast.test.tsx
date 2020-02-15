import { cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import { matchers } from 'jest-emotion';
import { ToastTypes } from '../../../interfaces/Toaster/ToastTypes';
import Toast from '../Toast';
import { renderWithStyles } from '../../../../test/utils/renderWithStyles';

expect.extend(matchers);

const props = {
  onClose: jest.fn(),
  message: 'message',
  id: '1',
  type: ToastTypes.Success,
};

describe('Snackbar Component', () => {
  afterEach(cleanup);

  it('Should display correct message', () => {
    const message = 'test';
    const { getByText } = renderWithStyles(
      <Toast {...props} message={message} />,
    );

    expect(getByText(message)).toBeTruthy();
  });

  it('Should fire onClose function when closeIcon is clicked', () => {
    const onClose = jest.fn();
    const id = '1';
    const { getByLabelText } = renderWithStyles(
      <Toast {...props} onClose={onClose} id={id} />,
    );

    fireEvent.click(getByLabelText('Close'));

    expect(onClose).toHaveBeenCalledWith(id);
  });
});
