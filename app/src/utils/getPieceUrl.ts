import { PlayerColor } from '../interfaces/player';
import { PieceType } from '../interfaces/piece';

const colorUrl = {
  [PlayerColor.WHITE]: 'WHITE',
  [PlayerColor.BLACK]: 'BLACK',
};

export const getPieceUrl = (playerColor: PlayerColor, type: PieceType) => {
  return `${colorUrl[playerColor]}_${type}`;
};
