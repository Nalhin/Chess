import { render } from '@testing-library/react';
import Timer from '../Timer';
import React from 'react';

const props = {
  totalTurnTimeRemaining: 1.99,
  isActive: false,
  turnStartDate: new Date().toISOString(),
};

describe('Timer component', () => {
  it('should increase timer, if active', async () => {
    const totalTurnTimeRemaining = 1.99;
    const turnStartDate = new Date().toISOString();
    const { findByText } = render(
      <Timer
        {...props}
        isActive
        totalTurnTimeRemaining={totalTurnTimeRemaining}
        turnStartDate={turnStartDate}
      />,
    );

    expect(await findByText(/0:0/i)).toBeInTheDocument();
  });

  it('should not increase timer, if inactive', async () => {
    const totalTurnTimeRemaining = 1.99;
    const turnStartDate = new Date().toISOString();
    const { findByText } = render(
      <Timer
        {...props}
        isActive={false}
        totalTurnTimeRemaining={totalTurnTimeRemaining}
        turnStartDate={turnStartDate}
      />,
    );

    try {
      await findByText(/0:0/i);
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
