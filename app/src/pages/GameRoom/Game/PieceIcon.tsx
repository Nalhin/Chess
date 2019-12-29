import React from 'react';
import { PieceType } from '../../../interfaces/piece';
import { PlayerColor } from '../../../interfaces/player';

interface Props {
  type: PieceType;
  playerColor: PlayerColor;
}

const colorUrl = {
  [PlayerColor.WHITE]: 'WHITE',
  [PlayerColor.BLACK]: 'BLACK',
};

const PieceIcon: React.FC<Props> = ({ type, playerColor }) => {
  const piece = `${colorUrl[playerColor]}_${type}`;

  return <img src={`/assets/images/chess/${piece}.png`} alt={piece} />;
};

export default PieceIcon;
