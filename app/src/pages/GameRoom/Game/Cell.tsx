import React from 'react';
import styled from '@emotion/styled';
import { PieceType } from '../../../interfaces/piece';
import { BoardPosition } from '../../../interfaces/boardPosition';
import { PlayerColor } from '../../../interfaces/player';
import PieceIcon from './PieceIcon';
import { useDrop } from 'react-dnd';
import { DragAndDropTypes } from '../../../contants/dragAndDropTypes';

const StyledCell = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:nth-child(16n + 1),
  &:nth-child(16n + 3),
  &:nth-child(16n + 5),
  &:nth-child(16n + 7),
  &:nth-child(16n + 10),
  &:nth-child(16n + 12),
  &:nth-child(16n + 14),
  &:nth-child(16n + 16) {
    background: black;
  }
  background: white;
`;

interface StyledCellProps {
  isSelected: boolean;
  isMoveAvailable: boolean;
}

const StyledOverlay = styled.div<StyledCellProps>`
  position: absolute;
  width: 25%;
  height: 25%;
  border-radius: 50%;
  background: ${props => {
    if (props.isSelected) {
      return 'red';
    }
    if (props.isMoveAvailable) {
      return 'blue';
    }
    return 'none';
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

  const [{}, drop] = useDrop({
    accept: DragAndDropTypes.PIECE,
    canDrop: () => isMoveAvailable,
    drop: () => makeMove(position),
  });

  function onDragBegin() {
    getAvailableMoves(position);
  }

  return (
    <StyledCell onClick={handleOnClick} ref={drop}>
      {type && (
        <PieceIcon
          onDragBegin={onDragBegin}
          playerColor={playerColor}
          type={type}
        />
      )}
      <StyledOverlay
        isSelected={isSelected}
        isMoveAvailable={isMoveAvailable}
      />
    </StyledCell>
  );
};

export default Cell;
