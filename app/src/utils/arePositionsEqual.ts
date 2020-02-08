import { BoardPosition } from '../interfaces/Game/BoardPosition';

export const arePositionsEqual = (
  firstPosition: BoardPosition,
  secondPosition: BoardPosition,
) =>
  firstPosition.x === secondPosition.x && firstPosition.y === secondPosition.y;
