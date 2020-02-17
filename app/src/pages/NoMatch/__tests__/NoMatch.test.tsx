import { render } from '@testing-library/react';
import React from 'react';
import NoMatch from '../NoMatch';

describe('NoMatch page', () => {
  it('should render correctly', () => {
    const { getByText } = render(<NoMatch />);

    expect(getByText(/no match/i)).toBeTruthy();
  });
});
