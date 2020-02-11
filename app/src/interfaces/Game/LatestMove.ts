import { BoardPosition } from './BoardPosition';

export interface LatestMove {
  initialPosition: BoardPosition;
  destinationPosition: BoardPosition;
}
