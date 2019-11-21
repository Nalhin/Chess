export const fakeAvailableMovesMessage = {
  body: JSON.stringify({
    type: 'AVAILABLE_MOVES',
    payload: { availableMoves: [{ x: '1', y: 2 }] },
  }),
};
