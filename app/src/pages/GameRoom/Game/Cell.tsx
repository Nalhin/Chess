import React from 'react';
import styled from '@emotion/styled';
import { PieceType } from '../../../inferfaces/piece';
import { BoardPosition } from '../../../inferfaces/boardPosition';
import { PlayerColor } from '../../../inferfaces/player';

interface StyledCellProps {
  isSelected: boolean;
  isMoveAvailable: boolean;
  playerColor: PlayerColor;
}

const StyledCell = styled.div`
  width: 100px;
  height: 100px;
  background: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props: StyledCellProps) => {
    switch (props.playerColor) {
      case PlayerColor.BLACK:
        return 'black';
      case PlayerColor.WHITE:
        return 'white';
    }
  }};
  background: ${(props: StyledCellProps) => {
    if (props.isSelected) {
      return 'red';
    }
    if (props.isMoveAvailable) {
      return 'yellow';
    }
    return 'lightblue';
  }};
`;

interface CellProps {
  type: PieceType;
  isSelected: boolean;
  isMoveAvailable: boolean;
  getAvailableMoves: (position: BoardPosition) => void;
  position: BoardPosition;
  makeMove: (position: BoardPosition) => void;
  playerColor: PlayerColor;
}

const Cell: React.FC<CellProps> = ({
  type,
  getAvailableMoves,
  position,
  isSelected,
  isMoveAvailable,
  makeMove,
  playerColor,
}) => {
  const handleOnClick = React.useCallback(() => {
    if (isMoveAvailable) {
      makeMove(position);
    } else {
      getAvailableMoves(position);
    }
  }, [position]);

  return (
    <StyledCell
      isSelected={isSelected}
      isMoveAvailable={isMoveAvailable}
      onClick={handleOnClick}
      playerColor={playerColor}
    >
      {type}
    </StyledCell>
  );
};

export default Cell;
