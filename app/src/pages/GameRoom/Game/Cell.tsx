import React from 'react';
import styled from '@emotion/styled';
import { PieceType } from '../../../inferfaces/piece';
import { BoardPosition } from '../../../inferfaces/boardPosition';

interface StyledCellProps {
  isSelected: boolean;
  isMoveAvailable: boolean;
}

const StyledCell = styled.div`
  width: 100px;
  height: 100px;
  background: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props: StyledCellProps) => props.isSelected && 'background:red'}
  ${(props: StyledCellProps) => props.isMoveAvailable && 'background:yellow'}
`;

interface CellProps {
  type: PieceType;
  isSelected: boolean;
  isMoveAvailable: boolean;
  getAvailableMoves: (position: BoardPosition) => void;
  position: BoardPosition;
}

const Cell: React.FC<CellProps> = ({
  type,
  getAvailableMoves,
  position,
  isSelected,
  isMoveAvailable,
}) => {
  const handleGetAvailableMoves = React.useCallback(() => {
    getAvailableMoves(position);
  }, [position]);
  return (
    <StyledCell
      isSelected={isSelected}
      isMoveAvailable={isMoveAvailable}
      onClick={handleGetAvailableMoves}
    >
      {type}
    </StyledCell>
  );
};

export default Cell;
