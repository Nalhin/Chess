import React from 'react';
import { BoardPosition } from '../../interfaces/boardPosition';
import { positionToChessPosition } from '../../utils/positionToChessPosition';
import styled from '@emotion/styled';

interface Props {
  initialPosition: BoardPosition;
  destinationPosition: BoardPosition;
}

const StyledPosition = styled.span`
  font-weight: ${props => props.theme.fontWeights.heading};
`;

const ChessMove: React.FC<Props> = ({
  initialPosition,
  destinationPosition,
}) => {
  return (
    <span>
      <StyledPosition>
        {positionToChessPosition(initialPosition)}
      </StyledPosition>{' '}
      to{' '}
      <StyledPosition>
        {positionToChessPosition(destinationPosition)}
      </StyledPosition>
    </span>
  );
};

export default ChessMove;
