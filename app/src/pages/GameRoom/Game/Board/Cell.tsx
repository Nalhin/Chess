import React from 'react';
import styled from '@emotion/styled';
import { PieceType } from '../../../../interfaces/piece';
import { BoardPosition } from '../../../../interfaces/boardPosition';
import { PlayerColor } from '../../../../interfaces/player';
import PieceIcon from './PieceIcon';
import { useDrop } from 'react-dnd';
import { DragAndDropTypes } from '../../../../contants/dragAndDropTypes';
import { CheckState } from '../../../../interfaces/checkState';
import { useTheme } from '@emotion/core';
import { cellSize } from '../../../../styles/cellSize';

interface StyledCellProps {
  isChecked: boolean;
  isHoverShown: boolean;
}

const StyledCell = styled.div<StyledCellProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:nth-of-type(16n + 1),
  &:nth-of-type(16n + 3),
  &:nth-of-type(16n + 5),
  &:nth-of-type(16n + 7),
  &:nth-of-type(16n + 10),
  &:nth-of-type(16n + 12),
  &:nth-of-type(16n + 14),
  &:nth-of-type(16n + 16) {
    background: black;
  }
  background: ${props => {
    if (props.isChecked) {
      return 'red !important';
    }
    return 'white';
  }};

  width: ${cellSize.desktop};
  height: ${cellSize.desktop};

  ${props => props.theme.mediaQueries.medium} {
    width: ${cellSize.tablet};
    height: ${cellSize.tablet};
  }

  ${props => props.theme.mediaQueries.small} {
    width: ${cellSize.mobile};
    height: ${cellSize.mobile};
  }

  ${props => props.isHoverShown && 'cursor:pointer'}
`;

interface StyledOverlayProps {
  isSelected: boolean;
  isMoveAvailable: boolean;
}

const StyledOverlay = styled.div<StyledOverlayProps>`
  position: absolute;
  width: 25%;
  height: 25%;
  border-radius: 50%;
  background: ${props => {
    if (props.isSelected) {
      return 'lightgreen';
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
  pieceColor: PlayerColor;
  currentPlayerColor: PlayerColor;
  checkState: CheckState;
  userColor: PlayerColor;
}

const Cell: React.FC<CellProps> = ({
  type,
  getAvailableMoves,
  position,
  isSelected,
  isMoveAvailable,
  makeMove,
  checkState,
  currentPlayerColor,
  pieceColor,
  userColor,
}) => {
  const theme = useTheme();

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

  const belongsToPlayer = pieceColor === userColor;
  const isHoverShown = belongsToPlayer || isMoveAvailable;

  const isChecked =
    checkState !== CheckState.NONE &&
    currentPlayerColor === pieceColor &&
    type === PieceType.KING;

  return (
    <StyledCell
      isHoverShown={isHoverShown}
      onClick={handleOnClick}
      ref={drop}
      isChecked={isChecked}
      theme={theme}
    >
      {type && (
        <PieceIcon
          onDragBegin={onDragBegin}
          pieceColor={pieceColor}
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
