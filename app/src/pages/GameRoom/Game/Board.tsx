import React from 'react';
import Cell from './Cell';
import styled from '@emotion/styled';
import { AvailableMoves } from '../../../interfaces/availableMoves';
import { Piece } from '../../../interfaces/piece';
import { BoardPosition } from '../../../interfaces/boardPosition';
import Letters from './Letters';
import Numbers from './Numbers';

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr;
  grid-template-rows: 8fr 1fr;
  user-select: none;
`;

const StyledBoardContainer = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
`;

interface Props {
  makeMove: (destinationPosition: BoardPosition) => void;
  availableMoves: AvailableMoves;
  board: Piece[][];
  selectedPosition: BoardPosition;
  getAvailableMoves: (destinationPosition: BoardPosition) => void;
}

const Board: React.FC<Props> = ({
  board,
  getAvailableMoves,
  selectedPosition,
  makeMove,
  availableMoves,
}) => {
  return (
    <StyledContainer>
      <Letters />
      <StyledBoardContainer>
        {board.map((row, x) =>
          row.map((cell, y) => (
            <Cell
              getAvailableMoves={getAvailableMoves}
              isSelected={selectedPosition.x == x && selectedPosition.y == y}
              isMoveAvailable={availableMoves.some(
                item => item.x == x && item.y == y,
              )}
              makeMove={makeMove}
              key={`${x}#${y}`}
              position={{ x: x, y: y }}
              type={cell?.type}
              playerColor={cell?.playerColor}
            />
          )),
        )}
      </StyledBoardContainer>
      <Numbers />
    </StyledContainer>
  );
};

export default Board;
