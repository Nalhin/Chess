import React from 'react';
import styled from '@emotion/styled';
import { PieceType } from '../../../inferfaces/piece';
import { BoardPosition } from '../../../inferfaces/boardPosition';

const StyledCell = styled.div`
  width: 100px;
  height: 100px;
  background: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface CellProps {
  type: PieceType;
  getAvailableMoves: (position: BoardPosition) => void;
  position: BoardPosition;
}

const Cell: React.FC<CellProps> = ({ type, getAvailableMoves, position }) => {
  const handleGetAvailableMoves = React.useCallback(() => {
    getAvailableMoves(position);
  }, [position]);

  return <StyledCell onClick={handleGetAvailableMoves}>{type}</StyledCell>;
};

export default Cell;
