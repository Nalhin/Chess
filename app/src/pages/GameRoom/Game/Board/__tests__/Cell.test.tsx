import { PieceType } from '../../../../../interfaces/Game/Piece';
import { fakeBoardPosition } from '../../../../../../test/fixtures/game/boardPosition';
import { PlayerColor } from '../../../../../interfaces/Game/Player';
import { CheckState } from '../../../../../interfaces/Game/CheckState';
import { renderWithDnd } from '../../../../../../test/utils/renderWithDnd';
import React from 'react';
import Cell from '../Cell';
import { fireEvent } from '@testing-library/react';

const props = {
  type: null as PieceType,
  getAvailableMoves: jest.fn(),
  position: fakeBoardPosition,
  isSelected: true,
  isMoveAvailable: true,
  makeMove: jest.fn(),
  checkState: CheckState.None,
  currentPlayerColor: PlayerColor.Black,
  pieceColor: PlayerColor.Black,
  userColor: PlayerColor.Black,
  isLatestMove: false,
};

describe('Cell component', () => {
  it('should fire makeMove event correctly', () => {
    const makeMove = jest.fn();

    const { container } = renderWithDnd(
      <Cell {...props} makeMove={makeMove} isMoveAvailable />,
    );

    fireEvent.click(container.firstElementChild);

    expect(makeMove).toHaveBeenCalledTimes(1);
  });
  it('should fire getAvailableMoves event correctly', () => {
    const getAvailableMoves = jest.fn();
    const { container } = renderWithDnd(
      <Cell
        {...props}
        getAvailableMoves={getAvailableMoves}
        isMoveAvailable={false}
      />,
    );

    fireEvent.click(container.firstElementChild);

    expect(getAvailableMoves).toHaveBeenCalledTimes(1);
  });

  it('should display available move', () => {
    const { getByTestId } = renderWithDnd(<Cell {...props} isMoveAvailable />);

    expect(getByTestId(/board__cell--move-available/)).toBeInTheDocument();
  });

  it('should hide available move', () => {
    const { queryByTestId } = renderWithDnd(
      <Cell {...props} isMoveAvailable={false} />,
    );

    expect(
      queryByTestId(/board__cell--move-available/),
    ).not.toBeInTheDocument();
  });
});
