import React from 'react';
import styled from '@emotion/styled';
import { PieceType } from '../../../../interfaces/Game/Piece';
import { BoardPosition } from '../../../../interfaces/Game/BoardPosition';
import { PlayerColor } from '../../../../interfaces/Game/Player';
import PieceIcon from './PieceIcon';
import { useDrop } from 'react-dnd';
import { DragAndDropTypes } from '../../../../contants/dragAndDropTypes';
import { CheckState } from '../../../../interfaces/Game/CheckState';
import mixins from '../../../../styles/mixins';
import { useTheme } from '@material-ui/core';
import { ColorMode } from '../../../../interfaces/Styles/ColorMode';

interface StyledCellProps {
  isChecked: boolean;
  isHoverShown: boolean;
  isSelected: boolean;
  canBeAttacked: boolean;
}

const StyledCell = styled.div<StyledCellProps>`
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
      props.theme.palette.type === ColorMode.Dark ? '#779556' : '#000'};
  }
  background: ${props => {
    if (props.isChecked) {
      return `${props.theme.palette.error.main} !important`;
    }
    return props.theme.palette.type === ColorMode.Dark ? '#EBECD0' : '#fff';
  }};
  border-style: solid;
  border-width: 6px;
  border-color: ${props => {
    if (props.canBeAttacked) {
      return props.theme.palette.error.main;
    }
    if (props.isSelected) {
      return props.theme.palette.info.main;
    }
    return 'transparent';
  }};
  ${props => mixins.getCellSize(props)}
  ${props => props.isHoverShown && 'cursor:pointer'};
`;

const StyledOverlay = styled.div`
  transition: none;
  position: absolute;
  width: 40%;
  height: 40%;
  border-radius: 50%;
  background: ${props => `${props.theme.palette.grey['600']}bb`};
`;

const StyledPieceIcon = styled(PieceIcon)`
  position: absolute;
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
  const canBeAttacked = type && isMoveAvailable && !belongsToPlayer;

  const isChecked =
    checkState !== CheckState.None &&
    currentPlayerColor === pieceColor &&
    type === PieceType.KING;

  return (
    <StyledCell
      isHoverShown={isHoverShown}
      onClick={handleOnClick}
      ref={drop}
      isChecked={isChecked}
      theme={theme}
      isSelected={isSelected}
      canBeAttacked={canBeAttacked}
    >
      {type && (
        <StyledPieceIcon
          onDragBegin={onDragBegin}
          pieceColor={pieceColor}
          type={type}
        />
      )}
      {isMoveAvailable && !canBeAttacked && <StyledOverlay theme={theme} />}
    </StyledCell>
  );
};

export default Cell;
