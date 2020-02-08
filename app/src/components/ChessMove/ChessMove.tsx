import React from 'react';
import { BoardPosition } from '../../interfaces/boardPosition';
import { positionToChessPosition } from '../../utils/positionToChessPosition';
import styled from '@emotion/styled';
import { Typography } from '@material-ui/core';

interface Props {
  initialPosition: BoardPosition;
  destinationPosition: BoardPosition;
}

const ChessMove: React.FC<Props> = ({
  initialPosition,
  destinationPosition,
}) => {
  return (
    <span>
      <Typography variant="body1">
        {positionToChessPosition(initialPosition)}
      </Typography>{' '}
      to{' '}
      <Typography variant="body1">
        {positionToChessPosition(destinationPosition)}
      </Typography>
    </span>
  );
};

export default ChessMove;
