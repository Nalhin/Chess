import {
  AvailableMovesSubscriptionAction,
  CheckIsGamePresentFailedAction,
  CheckIsGamePresentRequestedAction,
  CheckIsGamePresentSucceededAction,
  ClearGameAction,
  CloseGameAction,
  ForfeitGameAction,
  GameActionTypes,
  GameOverSubscriptionAction,
  GameStartedSubscriptionAction,
  GetAvailableMovesAction,
  InitGameAction,
  MakeMoveRequestedAction,
  PlayerMovedSubscriptionAction,
  ReconnectToGameRequestedAction,
} from './game.types';
import { Game } from '../../interfaces/Game/Game';
import { AvailableMoves } from '../../interfaces/Game/AvailableMoves';
import { BoardPosition } from '../../interfaces/Game/BoardPosition';
import { PieceType } from '../../interfaces/Game/Piece';

export const gameStarted = (game: Game): GameStartedSubscriptionAction => ({
  type: GameActionTypes.GAME_STARTED,
  payload: {
    game,
  },
});

export const playerMoved = (game: Game): PlayerMovedSubscriptionAction => ({
  type: GameActionTypes.PLAYER_MOVED,
  payload: {
    game,
  },
});

export const gameOver = (game: Game): GameOverSubscriptionAction => ({
  type: GameActionTypes.GAME_OVER,
  payload: {
    game,
  },
});

export const availableMoves = (
  availableMoves: AvailableMoves,
  position: BoardPosition,
): AvailableMovesSubscriptionAction => ({
  type: GameActionTypes.AVAILABLE_MOVES,
  payload: {
    availableMoves,
    position,
  },
});

export const initGame = (id: string): InitGameAction => ({
  type: GameActionTypes.INIT_GAME,
  payload: {
    id,
  },
});

export const getAvailableMoves = (
  initialPosition: BoardPosition,
): GetAvailableMovesAction => ({
  type: GameActionTypes.GET_AVAILABLE_MOVES,
  payload: {
    initialPosition,
  },
});

export const makeMoveRequested = (
  destinationPosition: BoardPosition,
): MakeMoveRequestedAction => ({
  type: GameActionTypes.MAKE_MOVE,
  payload: {
    destinationPosition,
  },
});

export const promotePawn = (position: BoardPosition, pieceType: PieceType) => ({
  type: GameActionTypes.PROMOTE_PAWN,
  payload: {
    pieceType,
    position,
  },
});

export const closeGame = (): CloseGameAction => ({
  type: GameActionTypes.CLOSE_GAME,
});

export const checkIsGamePresentRequested = (): CheckIsGamePresentRequestedAction => ({
  type: GameActionTypes.CHECK_IS_GAME_PRESENT_REQUESTED,
});

export const checkIsGamePresentSucceeded = (
  gameId: string,
): CheckIsGamePresentSucceededAction => ({
  type: GameActionTypes.CHECK_IS_GAME_PRESENT_SUCCEEDED,
  payload: { gameId },
});

export const checkIsGamePresentFailed = (): CheckIsGamePresentFailedAction => ({
  type: GameActionTypes.CHECK_IS_GAME_PRESENT_FAILED,
});
export const reconnectToGame = (): ReconnectToGameRequestedAction => ({
  type: GameActionTypes.RECONNECT_TO_GAME_REQUESTED,
});

export const clearGame = (): ClearGameAction => ({
  type: GameActionTypes.CLEAR_GAME,
});

export const forfeitGame = (): ForfeitGameAction => ({
  type: GameActionTypes.FORFEIT_GAME,
});
