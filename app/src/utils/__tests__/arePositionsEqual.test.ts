import { arePositionsEqual } from '../arePositionsEqual';
import { BoardPosition } from '../../interfaces/Game/BoardPosition';

describe('arePositionsEqual', () => {
  it('should return true, if positions are equal', () => {
    const firstPosition = { x: 2, y: 2 };
    const secondPosition = { x: 2, y: 2 };

    const result = arePositionsEqual(firstPosition, secondPosition);

    expect(result).toBeTruthy();
  });
  it('should return false, if positions are not equal', () => {
    const firstPosition = { x: 2, y: 2 };
    const secondPosition = { x: 2, y: 3 };

    const result = arePositionsEqual(firstPosition, secondPosition);

    expect(result).toBeFalsy();
  });
  it('should return false if position is falsy', () => {
    const firstPosition = { x: 2, y: 2 };
    const secondPosition = null as BoardPosition;

    const result = arePositionsEqual(firstPosition, secondPosition);

    expect(result).toBeFalsy();
  });
});
