import { cleanup, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { matchers } from 'jest-emotion';
import { ToastTypes } from '../../../interfaces/ToastTypes';
import Toast from '../Toast';
import { TOAST_COLORS } from '../../../styles/toaster';
import { renderWithStyles } from '../../../../test/utils/renderWithStyles';

expect.extend(matchers);

const props = {
  onClose: jest.fn(),
  message: 'message',
  id: '1',
  type: ToastTypes.SUCCESS,
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
    const { getByTestId } = renderWithStyles(
      <Toast {...props} onClose={onClose} id={id} />,
    );

    fireEvent.click(getByTestId(/toast__close-icon/));

    expect(onClose).toHaveBeenCalledWith(id);
  });

  it('Should change background color based on type', () => {
    const { getByTestId } = renderWithStyles(<Toast {...props} />);

    expect(getByTestId(/toast__content/i)).toHaveStyleRule(
      'background',
      TOAST_COLORS[ToastTypes.SUCCESS],
    );
  });
});
