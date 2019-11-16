import gameReducer, { GAME_INITIAL_STATE } from '../game.reducer';
import {
  availableMoves,
  availableMovesError,
  gameOver,
  gameStarted,
  playerMoved,
} from '../game.actions';
import produce from 'immer';
import { fakeGame } from '../../../../test/fixtures/game/game';
import { fakeAvailableMoves } from '../../../../test/fixtures/game/availableMoves';
import { fakeAvailableMovesError } from '../../../../test/fixtures/game/availableMovesError';

describe('Game Reducer', () => {
  it('Should return the initial state', () => {
    const expectedState = {
      ...GAME_INITIAL_STATE,
    };

    const reducer = gameReducer(undefined, availableMoves([]));

    expect(reducer).toEqual(expectedState);
  });
  it('Should handle GAME_STARTED action type', () => {
    const initialState = {
      ...GAME_INITIAL_STATE,
    };
    const expectedState = produce(GAME_INITIAL_STATE, draft => {
      draft.game = fakeGame;
    });

    const action = gameStarted(fakeGame);
    const reducer = gameReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle PLAYER_MOVED action type', () => {
    const initialState = {
      ...GAME_INITIAL_STATE,
    };
    const expectedState = produce(GAME_INITIAL_STATE, draft => {
      draft.game = fakeGame;
    });

    const action = playerMoved(fakeGame);
    const reducer = gameReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GAME_OVER action type', () => {
    const initialState = {
      ...GAME_INITIAL_STATE,
    };
    const expectedState = produce(GAME_INITIAL_STATE, draft => {
      draft.game = fakeGame;
    });

    const action = gameOver(fakeGame);
    const reducer = gameReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle AVAILABLE_MOVES action type', () => {
    const initialState = {
      ...GAME_INITIAL_STATE,
    };
    const expectedState = produce(GAME_INITIAL_STATE, draft => {
      draft.selectedPiece.availableMoves = fakeAvailableMoves;
    });

    const action = availableMoves(fakeAvailableMoves);
    const reducer = gameReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
  it('Should handle AVAILABLE_MOVES_ERROR action type', () => {
    const initialState = {
      ...GAME_INITIAL_STATE,
    };
    const expectedState = { ...GAME_INITIAL_STATE };

    const action = availableMovesError(fakeAvailableMovesError);
    const reducer = gameReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
});
