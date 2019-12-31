import {
  AvailableMovesErrorSubscriptionAction,
  AvailableMovesSubscriptionAction,
  CloseGameAction,
  GameBaseActionTypes,
  GameFoundSubscriptionAction,
  GameOverSubscriptionAction,
  GamePersonalSubscriptionActionTypes,
  GameStartedSubscriptionAction,
  GameStateSubscriptionActionTypes,
  GetAvailableMovesRequestedAction,
  InitGameAction,
  InitGameFailedAction,
  InitGameSucceededAction,
  MakeMoveRequestedAction,
  PlayerMovedSubscriptionAction,
  SetSelectedPieceAction,
} from './game.types';
import { Board } from '../../interfaces/board';
import { Game } from '../../interfaces/game';
import { AvailableMoves } from '../../interfaces/availableMoves';
import { BoardPosition } from '../../interfaces/boardPosition';

export const gameStarted = (game: Game): GameStartedSubscriptionAction => ({
  type: GameStateSubscriptionActionTypes.GAME_STARTED,
  payload: {
    game,
  },
});

export const playerMoved = (game: Game): PlayerMovedSubscriptionAction => ({
  type: GameStateSubscriptionActionTypes.PLAYER_MOVED,
  payload: {
    game,
  },
});

export const gameOver = (game: Game): GameOverSubscriptionAction => ({
  type: GameStateSubscriptionActionTypes.GAME_OVER,
  payload: {
    game,
  },
});

export const availableMoves = (
  availableMoves: AvailableMoves,
  position: BoardPosition,
): AvailableMovesSubscriptionAction => ({
  type: GamePersonalSubscriptionActionTypes.AVAILABLE_MOVES,
  payload: {
    availableMoves,
    position,
  },
});

export const availableMovesError = (
  error: string,
): AvailableMovesErrorSubscriptionAction => ({
  type: GamePersonalSubscriptionActionTypes.ERROR,
  payload: {
    error,
  },
});

export const gameFound = (gameId: string): GameFoundSubscriptionAction => ({
  type: GamePersonalSubscriptionActionTypes.GAME_FOUND,
  payload: {
    gameId,
  },
});

export const setSelectedPiece = (
  position: BoardPosition,
): SetSelectedPieceAction => ({
  type: GameBaseActionTypes.SET_SELECTED_PIECE,
  payload: {
    position,
  },
});

export const initGameRequested = (id: string): InitGameAction => ({
  type: GameBaseActionTypes.INIT_GAME,
  payload: {
    id,
  },
});

export const initGameSucceeded = (board: Board): InitGameSucceededAction => ({
  type: GameBaseActionTypes.INIT_GAME_SUCCEEDED,
  payload: {
    board,
  },
});

export const initGameFailed = (): InitGameFailedAction => ({
  type: GameBaseActionTypes.INIT_GAME_FAILED,
});

export const getAvailableMovesRequested = (
  initialPosition: BoardPosition,
): GetAvailableMovesRequestedAction => ({
  type: GameBaseActionTypes.GET_AVAILABLE_MOVES,
  payload: {
    initialPosition,
  },
});

export const makeMoveRequested = (
  destinationPosition: BoardPosition,
): MakeMoveRequestedAction => ({
  type: GameBaseActionTypes.MAKE_MOVE,
  payload: {
    destinationPosition,
  },
});

export const closeGame = (): CloseGameAction => ({
  type: GameBaseActionTypes.CLOSE_GAME,
});
