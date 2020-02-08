import React from 'react';
import Cell from './Cell';
import styled from '@emotion/styled';
import { AvailableMoves } from '../../../../interfaces/Game/AvailableMoves';
import { Piece } from '../../../../interfaces/Game/Piece';
import { BoardPosition } from '../../../../interfaces/Game/BoardPosition';
import { arePositionsEqual } from '../../../../utils/arePositionsEqual';
import { CheckState } from '../../../../interfaces/Game/CheckState';
import { PlayerColor } from '../../../../interfaces/Game/Player';
import BoardLetters from './BoardLetters';
import BoardNumbers from './BoardNumbers';

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  grid-template-rows: 8fr 1fr;
  user-select: none;
  width: fit-content;
`;

const StyledBoardContainer = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
`;

interface Props {
  makeMove: (destinationPosition: BoardPosition) => void;
  availableMoves: AvailableMoves;
  boardState: Piece[][];
  selectedPosition: BoardPosition;
  getAvailableMoves: (destinationPosition: BoardPosition) => void;
  checkState: CheckState;
  currentPlayerColor: PlayerColor;
  userColor: PlayerColor;
}

const Board: React.FC<Props> = ({
  boardState,
  getAvailableMoves,
  selectedPosition,
  makeMove,
  availableMoves,
  checkState,
  currentPlayerColor,
  userColor,
}) => {
  return (
    <StyledContainer>
      <BoardNumbers />
      <StyledBoardContainer>
        {boardState.map((row, x) =>
          row.map((cell, y) => {
            const position = { x, y };

            return (
              <Cell
                key={`${x}#${y}`}
                getAvailableMoves={getAvailableMoves}
                isSelected={arePositionsEqual(position, selectedPosition)}
                isMoveAvailable={availableMoves.some(item =>
                  arePositionsEqual(position, item),
                )}
                makeMove={makeMove}
                checkState={checkState}
                currentPlayerColor={currentPlayerColor}
                position={position}
                type={cell?.type}
                pieceColor={cell?.playerColor}
                userColor={userColor}
              />
            );
          }),
        )}
      </StyledBoardContainer>
      <BoardLetters />
    </StyledContainer>
  );
};

export default Board;
