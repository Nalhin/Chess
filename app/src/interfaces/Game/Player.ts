export enum PlayerColor {
  White = 0,
  Black = 1,
}

export interface Player {
  name: string;
  totalTurnTimeRemaining: number;
  turnStartDate: string;
}
