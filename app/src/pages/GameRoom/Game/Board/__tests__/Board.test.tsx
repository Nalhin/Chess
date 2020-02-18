import React from 'react';
import Board from '../Board';
import { renderWithDnd } from '../../../../../../test/utils/renderWithDnd';
import { fakeBoard } from '../../../../../../test/fixtures/game/board';
import { fakeBoardPosition } from '../../../../../../test/fixtures/game/boardPosition';
import { fakeAvailableMoves } from '../../../../../../test/fixtures/game/availableMoves';
import { CheckState } from '../../../../../interfaces/Game/CheckState';
import { PlayerColor } from '../../../../../interfaces/Game/Player';
import { PieceType } from '../../../../../interfaces/Game/Piece';
import { fireEvent } from '@testing-library/react';

const props = {
  boardState: fakeBoard.state,
  getAvailableMoves: jest.fn(),
  selectedPosition: fakeBoardPosition,
  makeMove: jest.fn(),
  availableMoves: fakeAvailableMoves,
  checkState: CheckState.None,
  currentPlayerColor: PlayerColor.Black,
  userColor: PlayerColor.Black,
  latestMove: {
    initialPosition: fakeBoardPosition,
    destinationPosition: fakeBoardPosition,
  },
};

describe('Board component', () => {
  it('should render board', () => {
    const boardState = fakeBoard.state;
    const countedPiece = PieceType.ROOK;
    let counter = 0;
    const { getAllByAltText } = renderWithDnd(
      <Board {...props} boardState={boardState} />,
    );

    boardState.forEach(row =>
      row.forEach(cell => {
        if (cell?.type === countedPiece) {
          counter++;
        }
      }),
    );

    expect(getAllByAltText(new RegExp(PieceType.ROOK)).length).toEqual(counter);
  });

  it('should allow dragging elements and render dragged item correctly', () => {
    const draggedPieceType = PieceType.ROOK;
    const { getByTestId, getAllByAltText } = renderWithDnd(
      <Board {...props} />,
    );

    fireEvent.dragStart(getAllByAltText(new RegExp(draggedPieceType))[0]);

    expect(
      getByTestId(new RegExp(`${draggedPieceType}.*--dragged`)),
    ).toBeInTheDocument();
  });
});
