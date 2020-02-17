import PasswordInput from '../PasswordInput';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

describe('PasswordInput component', () => {
  it('should change type on button click', () => {
    const { getByLabelText, queryByLabelText } = render(
      <PasswordInput value={''} />,
    );
    expect(queryByLabelText(/hide visibility/)).toBeFalsy();

    fireEvent.click(getByLabelText(/set visible/));

    expect(queryByLabelText(/hide visibility/)).toBeTruthy();
  });
});
