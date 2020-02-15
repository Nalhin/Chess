import React from 'react';
import { BoardPosition } from '../../interfaces/Game/BoardPosition';
import { positionToChessPosition } from '../../utils/positionToChessPosition';
import { Typography, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  display: flex;
  > span,
  p {
    margin-left: ${props => props.theme.spacing(0.5)}px;
  }
`;

interface Props {
  initialPosition: BoardPosition;
  destinationPosition: BoardPosition;
}

const ChessMove: React.FC<Props> = ({
  initialPosition,
  destinationPosition,
}) => {
  const theme = useTheme();
  return (
    <StyledContainer theme={theme}>
      <Typography variant="body1">
        {positionToChessPosition(initialPosition)}
      </Typography>
      <span>to</span>
      <Typography variant="body1">
        {positionToChessPosition(destinationPosition)}
      </Typography>
    </StyledContainer>
  );
};

export default ChessMove;
