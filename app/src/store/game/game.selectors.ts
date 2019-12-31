import { AppState } from '../rootReducer';
import { PlayerColor } from '../../interfaces/player';
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
    switch (currentTurn) {
      case PlayerColor.WHITE:
        return isEqual(players.whitePlayer.name, user.login);
      case PlayerColor.BLACK:
        return isEqual(players.blackPlayer.name, user.login);
      default:
        return false;
    }
  },
);
