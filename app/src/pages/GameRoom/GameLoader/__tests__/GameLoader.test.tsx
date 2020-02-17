import { render } from '@testing-library/react';
import GameLoader from '../GameLoader';
import React from 'react';

describe('GameLoader component', () => {
  it('should display loading', () => {
    const { getByText } = render(<GameLoader />);

    expect(getByText(/loading/i)).toBeTruthy();
  });
});
