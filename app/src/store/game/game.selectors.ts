import { AppState } from '../rootReducer';
import { PlayerColor } from '../../inferfaces/player';
import { userSelector } from '../user/user.selectors';
import { createSelector } from 'reselect';
import { isEqual } from 'lodash';

export const getSelectedPiece = (state: AppState) =>
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
        return isEqual(players.whitePlayer, user);
      case PlayerColor.BLACK:
        return isEqual(players.blackPlayer, user);
      default:
        return false;
    }
  },
);
