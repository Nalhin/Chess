import { BoardPosition } from '../interfaces/boardPosition';

export const arePositionsEqual = (
  firstPosition: BoardPosition,
  secondPosition: BoardPosition,
) =>
  firstPosition.x === secondPosition.x && firstPosition.y === secondPosition.y;
