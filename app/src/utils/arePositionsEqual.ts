import { BoardPosition } from '../interfaces/Game/BoardPosition';

export const arePositionsEqual = (
  firstPosition: BoardPosition,
  secondPosition: BoardPosition,
) => {
  if (!firstPosition || !secondPosition) {
    return false;
  }
  return (
    firstPosition.x === secondPosition.x && firstPosition.y === secondPosition.y
  );
};
