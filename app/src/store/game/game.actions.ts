import {
  AvailableMovesSubscriptionAction,
  ClearGameAction,
  CloseGameAction,
  ForfeitGameAction,
  GameBaseActionTypes,
  GameIsPresentFailedAction,
  GameIsPresentRequestedAction,
  GameIsPresentSucceededAction,
  GameOverSubscriptionAction,
  GamePersonalSubscriptionActionTypes,
  GameReconnectActionTypes,
  GameReconnectFailedAction,
  GameReconnectRequestedAction,
  GameReconnectSucceededAction,
  GameStartedSubscriptionAction,
  GameStateSubscriptionActionTypes,
  GetAvailableMovesRequestedAction,
  InitGameAction,
  MakeMoveRequestedAction,
  PlayerMovedSubscriptionAction,
} from './game.types';
import { Game } from '../../interfaces/game';
import { AvailableMoves } from '../../interfaces/availableMoves';
import { BoardPosition } from '../../interfaces/boardPosition';
import { PieceType } from '../../interfaces/piece';

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

export const initGameRequested = (id: string): InitGameAction => ({
  type: GameBaseActionTypes.INIT_GAME,
  payload: {
    id,
  },
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

export const promotePawn = (position: BoardPosition, pieceType: PieceType) => ({
  type: GameBaseActionTypes.PROMOTE_PAWN,
  payload: {
    pieceType,
    position,
  },
});

export const closeGame = (): CloseGameAction => ({
  type: GameBaseActionTypes.CLOSE_GAME,
});

export const gameIsPresentRequested = (): GameIsPresentRequestedAction => ({
  type: GameReconnectActionTypes.GAME_IS_PRESENT_REQUESTED,
});

export const gameIsPresentSucceeded = (
  gameId: string,
): GameIsPresentSucceededAction => ({
  type: GameReconnectActionTypes.GAME_IS_PRESENT_SUCCEEDED,
  payload: { gameId },
});

export const gameIsPresentFailed = (): GameIsPresentFailedAction => ({
  type: GameReconnectActionTypes.GAME_IS_PRESENT_FAILED,
});
export const gameReconnectRequested = (): GameReconnectRequestedAction => ({
  type: GameReconnectActionTypes.GAME_RECONNECT_REQUESTED,
});

export const gameReconnectSucceeded = (
  game: Game,
): GameReconnectSucceededAction => ({
  type: GameReconnectActionTypes.GAME_RECONNECT_SUCCEEDED,
  payload: {
    game,
  },
});

export const gameReconnectFailed = (): GameReconnectFailedAction => ({
  type: GameReconnectActionTypes.GAME_RECONNECT_FAILED,
});

export const clearGame = (): ClearGameAction => ({
  type: GameBaseActionTypes.CLEAR_GAME,
});

export const forfeitGame = (): ForfeitGameAction => ({
  type: GameBaseActionTypes.FORFEIT_GAME,
});
