import { fireEvent } from '@testing-library/react';
import Info from '../Info';
import React from 'react';
import { renderWithStore } from '../../../../test/utils/renderWithStore';

describe('Info component', () => {
  it('should allow registration', () => {
    const registerUser = jest.fn();
    const { getByText } = renderWithStore(<Info registerUser={registerUser} />);

    fireEvent.click(getByText(/placeholder account/i));

    expect(registerUser).toHaveBeenCalledTimes(1);
  });
});
