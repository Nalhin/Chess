import { AppState } from '../rootReducer';
import { userSelector } from '../user/user.selectors';
import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';
import { GAME_INITIAL_STATE } from './game.reducer';
import { PlayerColor } from '../../interfaces/player';

export const gameIdSelector = (state: AppState) => state.game.gameId;

export const selectedPieceSelector = (state: AppState) =>
  state.game.selectedPiece.position;

const gamePlayersSelector = (state: AppState) => state.game.gameState.players;

const gameCurrentTurnSelector = (state: AppState) =>
  state.game.gameState.currentTurn;

export const isCurrentTurnSelector = createSelector(
  gamePlayersSelector,
  gameCurrentTurnSelector,
  userSelector,
  (players, currentTurn, user) => {
    return isEqual(players[currentTurn.currentPlayerColor].name, user.login);
  },
);

export const isGameLoadingSelector = (state: AppState) =>
  isEqual(state.game.gameState, GAME_INITIAL_STATE.gameState);

export const userColorSelector = createSelector(
  gamePlayersSelector,
  userSelector,
  (players, user) => {
    if (players[PlayerColor.BLACK].name === user.login) {
      return PlayerColor.BLACK;
    }
    return PlayerColor.WHITE;
  },
);
