import React from 'react';
import { PieceType } from '../../interfaces/Game/Piece';
import upperFirst from 'lodash/upperFirst';
import { Tooltip } from '@material-ui/core';

interface Props {
  pieceType: PieceType;
}

const PieceTooltip: React.FC<Props> = ({ pieceType, children }) => {
  return (
    <Tooltip title={upperFirst(pieceType.toLowerCase())} placement="top">
      <div>{children}</div>
    </Tooltip>
  );
};

export default PieceTooltip;
