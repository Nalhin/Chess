import ForfeitGame from '../ForfeitGame';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

describe('ForfeitGame component', () => {
  it('should allow forfeiting the game', () => {
    const forfeitGame = jest.fn();
    const { getByText, getByLabelText } = render(
      <ForfeitGame forfeitGame={forfeitGame} />,
    );

    fireEvent.click(getByLabelText(/forfeit game/i));
    fireEvent.click(getByText(/yes/i));

    expect(forfeitGame).toHaveBeenCalledTimes(1);
  });
});
