import React from 'react';
import styled from '@emotion/styled';
import { PieceType } from '../../../inferfaces/piece';

const StyledCell = styled.div`
  width: 100px;
  height: 100px;
  background: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface CellProps {
  type: typeof PieceType;
}

const Cell: React.FC<CellProps> = ({ type }) => {
  return <StyledCell>{type}</StyledCell>;
};

export default Cell;
