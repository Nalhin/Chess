import { Player, PlayerColor } from './player';

export interface Players {
  [PlayerColor.WHITE]: Player;
  [PlayerColor.BLACK]: Player;
}
