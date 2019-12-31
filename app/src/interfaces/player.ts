export enum PlayerColor {
  WHITE = 0,
  BLACK = 1,
}

export interface Player {
  name: string;
  totalTurnTimeRemaining: number;
}
