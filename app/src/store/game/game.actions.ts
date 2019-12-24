import {
  AvailableMovesErrorSubscriptionAction,
  AvailableMovesSubscriptionAction,
  GameBaseActionTypes,
  GameFoundSubscriptionAction,
  GameOverSubscriptionAction,
  GamePersonalSubscriptionActionTypes,
  GameStartedSubscriptionAction,
  GameStateSubscriptionActionTypes,
  GetAvailableMovesFailedAction,
  GetAvailableMovesRequestedAction,
  GetAvailableMovesSucceededAction,
  InitGameFailedAction,
  InitGameRequestedAction,
  InitGameSucceededAction,
  JoinGameQueueAction,
  MakeMoveFailedAction,
  MakeMoveRequestedAction,
  MakeMoveSucceededAction,
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
  type: GamePersonalSubscriptionActionTypes.GAME_ERROR,
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

export const joinGameQueue = (): JoinGameQueueAction => ({
  type: GameBaseActionTypes.JOIN_GAME_QUEUE,
});

export const setSelectedPiece = (
  position: BoardPosition,
): SetSelectedPieceAction => ({
  type: GameBaseActionTypes.SET_SELECTED_PIECE,
  payload: {
    position,
  },
});

export const initGameRequested = (id: string): InitGameRequestedAction => ({
  type: GameBaseActionTypes.INIT_GAME_REQUESTED,
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
  type: GameBaseActionTypes.GET_AVAILABLE_MOVES_REQUESTED,
  payload: {
    initialPosition,
  },
});

export const GetAvailableMovesSucceeded = (
  availableMoves: AvailableMoves,
): GetAvailableMovesSucceededAction => ({
  type: GameBaseActionTypes.GET_AVAILABLE_MOVES_SUCCEEDED,
  payload: {
    availableMoves,
  },
});

export const GetAvailableMovesFailed = (): GetAvailableMovesFailedAction => ({
  type: GameBaseActionTypes.GET_AVAILABLE_MOVES_FAILED,
});

export const makeMoveRequested = (
  destinationPosition: BoardPosition,
): MakeMoveRequestedAction => ({
  type: GameBaseActionTypes.MAKE_MOVE_REQUESTED,
  payload: {
    destinationPosition,
  },
});

export const makeMoveSucceeded = (board: Board): MakeMoveSucceededAction => ({
  type: GameBaseActionTypes.MAKE_MOVE_SUCCEEDED,
  payload: {
    board,
  },
});

export const makeMoveFailed = (): MakeMoveFailedAction => ({
  type: GameBaseActionTypes.MAKE_MOVE_FAILED,
});
