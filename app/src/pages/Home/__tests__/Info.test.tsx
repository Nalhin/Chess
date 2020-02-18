import { fireEvent } from '@testing-library/react';
import Info from '../Info';
import React from 'react';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';

describe('Info component', () => {
  it('should allow registration', () => {
    const registerUser = jest.fn();
    const { getByText } = renderWithRouter(
      <Info registerUser={registerUser} />,
    );

    fireEvent.click(getByText(/placeholder account/i));

    expect(registerUser).toHaveBeenCalledTimes(1);
  });
});
