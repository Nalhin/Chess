import React from 'react';
import Cell from './Cell';
import styled from '@emotion/styled';
import { AvailableMoves } from '../../../interfaces/availableMoves';
import { Piece } from '../../../interfaces/piece';
import { BoardPosition } from '../../../interfaces/boardPosition';
import { arePositionsEqual } from '../../../utils/arePositionsEqual';
import BoardLetters from './BoardLetters';
import BoardNumbers from './Numbers';

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
      <BoardLetters />
      <StyledBoardContainer>
        {board.map((row, x) =>
          row.map((cell, y) => {
            const position = { x, y };

            return (
              <Cell
                getAvailableMoves={getAvailableMoves}
                isSelected={arePositionsEqual(position, selectedPosition)}
                isMoveAvailable={availableMoves.some(item =>
                  arePositionsEqual(position, item),
                )}
                makeMove={makeMove}
                key={`${x}#${y}`}
                position={position}
                type={cell?.type}
                playerColor={cell?.playerColor}
              />
            );
          }),
        )}
      </StyledBoardContainer>
      <BoardNumbers />
    </StyledContainer>
  );
};

export default Board;
