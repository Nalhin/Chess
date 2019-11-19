import gameReducer, { GAME_INITIAL_STATE } from '../game.reducer';
import {
  availableMoves,
  availableMovesError,
  gameOver,
  gameStarted,
  initGameRequested,
  playerMoved,
} from '../game.actions';
import produce from 'immer';
import { fakeGame } from '../../../../test/fixtures/game/game';
import { fakeAvailableMoves } from '../../../../test/fixtures/game/availableMoves';
import { fakeAvailableMovesError } from '../../../../test/fixtures/game/availableMovesError';
import { fakeBoardPosition } from '../../../../test/fixtures/game/boardPosition';
import { fakeGameId } from '../../../../test/fixtures/game/gameId';

describe('Game Reducer', () => {
  it('Should handle GAME_STARTED action type', () => {
    const initialState = {
      ...GAME_INITIAL_STATE,
    };
    const expectedState = produce(GAME_INITIAL_STATE, draft => {
      draft.gameState = fakeGame;
    });

    const action = gameStarted(fakeGame);
    const reducer = gameReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle INIT_GAME_REQUESTED action type', () => {
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
  it('Should handle GAME_ERROR action type', () => {
    const initialState = {
      ...GAME_INITIAL_STATE,
    };
    const expectedState = produce(GAME_INITIAL_STATE, draft => {
      draft.error = fakeAvailableMovesError;
    });

    const action = availableMovesError(fakeAvailableMovesError);
    const reducer = gameReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
});
