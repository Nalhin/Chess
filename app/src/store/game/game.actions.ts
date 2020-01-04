import {
  AvailableMovesSubscriptionAction,
  CloseGameAction,
  GameBaseActionTypes,
  GameOverSubscriptionAction,
  GamePersonalSubscriptionActionTypes,
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
