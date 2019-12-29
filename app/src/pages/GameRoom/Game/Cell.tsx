import React from 'react';
import styled from '@emotion/styled';
import { PieceType } from '../../../interfaces/piece';
import { BoardPosition } from '../../../interfaces/boardPosition';
import { PlayerColor } from '../../../interfaces/player';
import PieceIcon from './PieceIcon';

interface StyledCellProps {
  isSelected: boolean;
  isMoveAvailable: boolean;
}

const StyledCell = styled.div<StyledCellProps>`
  width: 100px;
  height: 100px;
  background: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => {
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
    >
      {type && <PieceIcon playerColor={playerColor} type={type} />}
    </StyledCell>
  );
};

export default Cell;
