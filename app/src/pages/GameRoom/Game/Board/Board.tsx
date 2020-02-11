import React from 'react';
import Cell from './Cell';
import styled from '@emotion/styled';
import { AvailableMoves } from '../../../../interfaces/Game/AvailableMoves';
import { Piece } from '../../../../interfaces/Game/Piece';
import { BoardPosition } from '../../../../interfaces/Game/BoardPosition';
import { arePositionsEqual } from '../../../../utils/arePositionsEqual';
import { CheckState } from '../../../../interfaces/Game/CheckState';
import { PlayerColor } from '../../../../interfaces/Game/Player';
import { LatestMove } from '../../../../interfaces/Game/LatestMove';
import BoardDragLayer from './BoardDragLayer';

const StyledBoardContainer = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: relative;
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
  latestMove: LatestMove;
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
  latestMove,
}) => {
  return (
    <div>
      <BoardDragLayer />
      <StyledBoardContainer>
        {boardState.map((row, x) =>
          row.map((cell, y) => {
            const position = { x, y };
            return (
              <Cell
                key={`${x}${y}`}
                getAvailableMoves={getAvailableMoves}
                isSelected={arePositionsEqual(position, selectedPosition)}
                isMoveAvailable={availableMoves.some(item =>
                  arePositionsEqual(position, item),
                )}
                makeMove={makeMove}
                checkState={checkState}
                currentPlayerColor={currentPlayerColor}
                isLatestMove={
                  arePositionsEqual(position, latestMove.destinationPosition) ||
                  arePositionsEqual(position, latestMove.initialPosition)
                }
                position={position}
                type={cell?.type}
                pieceColor={cell?.playerColor}
                userColor={userColor}
              />
            );
          }),
        )}
      </StyledBoardContainer>
    </div>
  );
};

export default Board;
