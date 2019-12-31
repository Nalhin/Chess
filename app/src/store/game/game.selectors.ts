import { AppState } from '../rootReducer';
import { userSelector } from '../user/user.selectors';
import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';

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
    return isEqual(players[currentTurn].name, user.login);
  },
);
