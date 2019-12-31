import React from 'react';
import { PieceType } from '../../../../interfaces/piece';
import { PlayerColor } from '../../../../interfaces/player';
import { getPieceUrl } from '../../../../utils/getPieceUrl';

interface Props {
  type: PieceType;
  playerColor: PlayerColor;
}

const GraveyardIcon: React.FC<Props> = ({ type, playerColor }) => {
  const pieceUrl = getPieceUrl(playerColor, type);

  return (
    <img
      src={`/assets/images/chess/${pieceUrl}.png`}
      alt={`${type} ${playerColor}`}
    />
  );
};

export default GraveyardIcon;
