import gameReducer, { GAME_INITIAL_STATE } from '../game.reducer';
import {
  availableMoves,
  checkIsGamePresentSucceeded,
  clearGame,
  gameOver,
  gameStarted,
  initGameRequested,
  playerMoved,
} from '../game.actions';
import produce from 'immer';
import { fakeGame } from '../../../../test/fixtures/game/fakeGame';
import { fakeAvailableMoves } from '../../../../test/fixtures/game/fakeAvailableMoves';
import { fakeBoardPosition } from '../../../../test/fixtures/game/fakeBoardPosition';
import { fakeGameId } from '../../../../test/fixtures/game/fakeGameId';

describe('Game Reducer', () => {
  it('Should handle GAME_STARTED action type', () => {
    const initialState = {
      ...GAME_INITIAL_STATE,
    };
    const expectedState = produce(GAME_INITIAL_STATE, draft => {
      draft.gameState = fakeGame;
      draft.isConnected = true;
    });

    const action = gameStarted(fakeGame);
    const reducer = gameReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle INIT_GAME action type', () => {
    const initialState = {
      ...GAME_INITIAL_STATE,
    };
    const expectedState = produce(GAME_INITIAL_STATE, draft => {
      draft.gameId = fakeGameId;
    });

    const action = initGameRequested(fakeGameId);
    const reducer = gameReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle PLAYER_MOVED action type', () => {
    const initialState = {
      ...GAME_INITIAL_STATE,
    };
    const expectedState = produce(GAME_INITIAL_STATE, draft => {
      draft.gameState = fakeGame;
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
      draft.gameState = fakeGame;
    });

    const action = gameOver(fakeGame);
    const reducer = gameReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle CLEAR_GAME action type', () => {
    const initialState = produce(GAME_INITIAL_STATE, draft => {
      draft.gameState = fakeGame;
      draft.gameId = fakeGameId;
    });
    const expectedState = {
      ...GAME_INITIAL_STATE,
    };

    const action = clearGame();
    const reducer = gameReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle AVAILABLE_MOVES action type', () => {
    const initialState = {
      ...GAME_INITIAL_STATE,
    };
    const expectedState = produce(GAME_INITIAL_STATE, draft => {
      draft.selectedPiece.availableMoves = fakeAvailableMoves;
      draft.selectedPiece.position = fakeBoardPosition;
    });

    const action = availableMoves(fakeAvailableMoves, fakeBoardPosition);
    const reducer = gameReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle CHECK_IS_GAME_PRESENT_SUCCEEDED', () => {
    const initialState = {
      ...GAME_INITIAL_STATE,
    };
    const expectedState = produce(GAME_INITIAL_STATE, draft => {
      draft.isReconnectAvailable = true;
      draft.gameId = fakeGameId;
    });

    const action = checkIsGamePresentSucceeded(fakeGameId);
    const reducer = gameReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
});
