import React from 'react';
import styled from '@emotion/styled';
import { PieceType } from '../../../../interfaces/Game/Piece';
import { BoardPosition } from '../../../../interfaces/Game/BoardPosition';
import { PlayerColor } from '../../../../interfaces/Game/Player';
import PieceIcon from './PieceIcon';
import { useDrop } from 'react-dnd';
import { DragAndDropTypes } from '../../../../interfaces/DragAndDrop/DragAndDropTypes';
import { CheckState } from '../../../../interfaces/Game/CheckState';
import mixins from '../../../../styles/mixins';
import { useTheme } from '@material-ui/core';
import { ColorTheme } from '../../../../interfaces/Styles/ColorTheme';

interface StyledCellProps {
  isChecked?: boolean;
  isHoverShown?: boolean;
  isSelected?: boolean;
  canBeAttacked?: boolean;
  isLatestMove?: boolean;
}

export const StyledCell = styled.div<StyledCellProps>`
  ${mixins.flexCenter};
  position: relative;
  &:nth-of-type(16n + 1),
  &:nth-of-type(16n + 3),
  &:nth-of-type(16n + 5),
  &:nth-of-type(16n + 7),
  &:nth-of-type(16n + 10),
  &:nth-of-type(16n + 12),
  &:nth-of-type(16n + 14),
  &:nth-of-type(16n + 16) {
    background: ${props =>
      props.theme.palette.type === ColorTheme.Dark ? '#779556' : '#000'};
  }
  background: ${props => {
    if (props.isChecked) {
      return `${props.theme.palette.error.main} !important`;
    }
    return props.theme.palette.type === ColorTheme.Dark ? '#EBECD0' : '#fff';
  }};
  border-style: solid;
  border-width: 6px;
  ${props => props.theme.breakpoints.down('sm')} {
    border-width: 3px;
  }
  border-color: ${props => {
    if (props.isSelected) {
      return props.theme.palette.info.main;
    }
    if (props.canBeAttacked) {
      return props.theme.palette.error.main;
    }
    if (props.isLatestMove) {
      return props.theme.palette.warning.main;
    }
    return 'transparent';
  }};
  ${props => mixins.getCellSize(props)}
  ${props => props.isHoverShown && 'cursor:pointer'};
`;

export const StyledOverlay = styled.div`
  transition: none;
  position: absolute;
  width: 40%;
  height: 40%;
  border-radius: 50%;
  background: ${props => `${props.theme.palette.grey['600']}bb`};
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
  isLatestMove: boolean;
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
  isLatestMove,
}) => {
  const theme = useTheme();
  const handleOnClick = React.useCallback(() => {
    if (isMoveAvailable) {
      makeMove(position);
    } else {
      getAvailableMoves(position);
    }
  }, [position]);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DragAndDropTypes.PIECE,
    canDrop: () => isMoveAvailable,
    drop: () => {
      makeMove(position);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const onDragBegin = () => {
    getAvailableMoves(position);
  };

  const belongsToPlayer = pieceColor === userColor;
  const isHoverShown = belongsToPlayer || isMoveAvailable;
  const canBeAttacked = type && isMoveAvailable && !belongsToPlayer;

  const isChecked =
    checkState !== CheckState.None &&
    currentPlayerColor === pieceColor &&
    type === PieceType.KING;

  const dndSelected = isOver && canDrop;
  return (
    <StyledCell
      isHoverShown={isHoverShown}
      onClick={handleOnClick}
      ref={drop}
      isChecked={isChecked}
      theme={theme}
      isSelected={isSelected || dndSelected}
      canBeAttacked={canBeAttacked}
      isLatestMove={isLatestMove}
    >
      {type && (
        <PieceIcon
          onDragBegin={onDragBegin}
          pieceColor={pieceColor}
          type={type}
        />
      )}
      {isMoveAvailable && !canBeAttacked && (
        <StyledOverlay
          theme={theme}
          data-testid="board__cell--move-available"
        />
      )}
    </StyledCell>
  );
};

export default Cell;
