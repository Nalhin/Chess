import { GameActionTypes } from '../../../../src/store/game/game.types';
import { fakeAvailableMovesError } from '../fakeAvailableMovesError';

export const fakeAvailableMovesErrorMessage = {
  body: JSON.stringify({
    type: GameActionTypes.ERROR,
    payload: { error: fakeAvailableMovesError },
  }),
};
