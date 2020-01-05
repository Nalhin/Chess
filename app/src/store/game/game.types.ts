import { Game } from '../../interfaces/game';
import { BoardPosition } from '../../interfaces/boardPosition';
import { AvailableMoves } from '../../interfaces/availableMoves';
import { PieceType } from '../../interfaces/piece';
import { CustomRouterLocationChangeAction } from '../customRouter/customRouter.types';

export interface GameState {
  readonly gameState: Game;
  readonly selectedPiece: {
    position: BoardPosition;
    availableMoves: AvailableMoves;
  };
  readonly gameId: string;
  readonly isReconnect: boolean;
}

export enum GameBaseActionTypes {
  INIT_GAME = 'INIT_GAME',
  PROMOTE_PAWN = 'PROMOTE_PAWN',
  GET_AVAILABLE_MOVES = 'GET_AVAILABLE_MOVES',
  MAKE_MOVE = 'MAKE_MOVE',
  CLOSE_GAME = 'CLOSE_GAME',
  CLEAR_GAME = 'CLEAR_GAME',
}

export enum GamePersonalSubscriptionActionTypes {
  AVAILABLE_MOVES = 'AVAILABLE_MOVES',
  ERROR = 'ERROR',
}

export enum GameStateSubscriptionActionTypes {
  GAME_STARTED = 'GAME_STARTED',
  PLAYER_MOVED = 'PLAYER_MOVED',
  GAME_OVER = 'GAME_OVER',
}

export enum GameReconnectActionTypes {
  GAME_IS_PRESENT_REQUESTED = 'GAME_IS_PRESENT_REQUESTED',
  GAME_IS_PRESENT_SUCCEEDED = 'GAME_IS_PRESENT_SUCCEEDED',
  GAME_IS_PRESENT_FAILED = 'GAME_IS_PRESENT_FAILED',
  GAME_RECONNECT_REQUESTED = 'GAME_RECONNECT_REQUESTED',
  GAME_RECONNECT_SUCCEEDED = 'GAME_RECONNECT_SUCCEEDED',
  GAME_RECONNECT_FAILED = 'GAME_RECONNECT_FAILED',
}

export const GameSubscriptionActionTypes = {
  ...GamePersonalSubscriptionActionTypes,
  ...GameStateSubscriptionActionTypes,
  ...GameReconnectActionTypes,
};

export const GameActionTypes = {
  ...GameBaseActionTypes,
  ...GameSubscriptionActionTypes,
};

export interface GameStartedSubscriptionAction {
  type: typeof GameStateSubscriptionActionTypes.GAME_STARTED;
  payload: {
    game: Game;
  };
}

export interface PlayerMovedSubscriptionAction {
  type: typeof GameStateSubscriptionActionTypes.PLAYER_MOVED;
  payload: {
    game: Game;
  };
}

export interface GameOverSubscriptionAction {
  type: typeof GameStateSubscriptionActionTypes.GAME_OVER;
  payload: {
    game: Game;
  };
}

export interface AvailableMovesSubscriptionAction {
  type: typeof GamePersonalSubscriptionActionTypes.AVAILABLE_MOVES;
  payload: {
    availableMoves: AvailableMoves;
    position: BoardPosition;
  };
}

export interface InitGameAction {
  type: typeof GameBaseActionTypes.INIT_GAME;
  payload: {
    id: string;
  };
}

export interface GetAvailableMovesRequestedAction {
  type: typeof GameBaseActionTypes.GET_AVAILABLE_MOVES;
  payload: {
    initialPosition: BoardPosition;
  };
}

export interface MakeMoveRequestedAction {
  type: typeof GameBaseActionTypes.MAKE_MOVE;
  payload: {
    destinationPosition: BoardPosition;
  };
}

export interface PromotePawnAction {
  type: typeof GameBaseActionTypes.PROMOTE_PAWN;
  payload: {
    pieceType: PieceType;
  };
}

export interface CloseGameAction {
  type: typeof GameBaseActionTypes.CLOSE_GAME;
}

export interface GameIsPresentRequestedAction {
  type: GameReconnectActionTypes.GAME_IS_PRESENT_REQUESTED;
}

export interface GameIsPresentSucceededAction {
  type: GameReconnectActionTypes.GAME_IS_PRESENT_SUCCEEDED;
  payload: {
    gameId: string;
  };
}

export interface GameIsPresentFailedAction {
  type: GameReconnectActionTypes.GAME_IS_PRESENT_FAILED;
}

export interface GameReconnectRequestedAction {
  type: GameReconnectActionTypes.GAME_RECONNECT_REQUESTED;
}

export interface GameReconnectSucceededAction {
  type: GameReconnectActionTypes.GAME_RECONNECT_SUCCEEDED;
  payload: {
    game: Game;
  };
}
export interface GameReconnectFailedAction {
  type: GameReconnectActionTypes.GAME_RECONNECT_FAILED;
}
export interface ClearGameAction {
  type: GameBaseActionTypes.CLEAR_GAME;
}

export type GameActions =
  | InitGameAction
  | GetAvailableMovesRequestedAction
  | MakeMoveRequestedAction
  | GameStartedSubscriptionAction
  | PlayerMovedSubscriptionAction
  | GameOverSubscriptionAction
  | AvailableMovesSubscriptionAction
  | PromotePawnAction
  | CloseGameAction
  | GameIsPresentRequestedAction
  | GameIsPresentSucceededAction
  | GameIsPresentFailedAction
  | GameReconnectRequestedAction
  | GameReconnectSucceededAction
  | GameReconnectFailedAction
  | ClearGameAction;
