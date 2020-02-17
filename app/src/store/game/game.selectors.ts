import { AppState } from '../rootReducer';
import { userSelector } from '../user/user.selectors';
import { createSelector } from 'reselect';
import { PlayerColor } from '../../interfaces/Game/Player';

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
    return players[currentTurn.currentPlayerColor].name === user.login;
  },
);

export const isGameLoadingSelector = (state: AppState) =>
  !state.game.isConnected;

export const userColorSelector = createSelector(
  gamePlayersSelector,
  userSelector,
  (players, user) => {
    if (players[PlayerColor.Black].name === user.login) {
      return PlayerColor.Black;
    }
    return PlayerColor.White;
  },
);
