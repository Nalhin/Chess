import { PlayerColor } from '../interfaces/Game/Player';
import { PieceType } from '../interfaces/Game/Piece';

const colorUrl = {
  [PlayerColor.White]: 'WHITE',
  [PlayerColor.Black]: 'BLACK',
};

export const getPieceUrl = (playerColor: PlayerColor, type: PieceType) => {
  return `${colorUrl[playerColor]}_${type}`;
};
