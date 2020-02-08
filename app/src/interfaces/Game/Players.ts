import { Player, PlayerColor } from './Player';

export interface Players {
  [PlayerColor.White]: Player;
  [PlayerColor.Black]: Player;
}
