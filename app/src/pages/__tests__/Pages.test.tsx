import { renderWithStore } from '../../../test/utils/renderWithStore';
import React from 'react';
import Pages from '../Pages';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

describe('Pages Component', () => {
  it('Should handle "/game/:id route', async () => {
    const route = '/game/1';

    const { findByTestId } = renderWithStore(
      <DndProvider backend={Backend}>
        <Pages />
      </DndProvider>,
      { route },
    );

    const gameRoom = await findByTestId('home');

    expect(gameRoom).toBeTruthy();
  });
});
