import { fakeAvailableMoves } from '../fakeAvailableMoves';
import { availableMoves } from '../../../../src/store/game/game.actions';
import { fakeBoardPosition } from '../fakeBoardPosition';

export const fakeAvailableMovesMessage = {
  body: JSON.stringify(availableMoves(fakeAvailableMoves, fakeBoardPosition)),
};
