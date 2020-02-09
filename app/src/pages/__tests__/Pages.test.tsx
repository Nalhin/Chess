import { cleanup } from '@testing-library/react';
import { renderWithStore } from '../../../test/utils/renderWithStore';
import React from 'react';
import Pages from '../Pages';

describe('Pages Component', () => {
  afterEach(cleanup);

  it('Should handle "/game/:id route', async () => {
    const route = '/game/1';

    const { findByTestId } = renderWithStore(<Pages />, { route });

    const gameRoom = await findByTestId('home');

    expect(gameRoom).toBeTruthy();
  });
});
