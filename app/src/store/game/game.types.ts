import { Board } from '../../interfaces/board';
import { Game } from '../../interfaces/game';
import { BoardPosition } from '../../interfaces/boardPosition';
import { AvailableMoves } from '../../interfaces/availableMoves';

export interface GameState {
  readonly gameState: Game;
  readonly selectedPiece: {
    position: BoardPosition;
    availableMoves: AvailableMoves;
  };
  readonly error: string;
  readonly gameId: string;
}

export enum GameBaseActionTypes {
  JOIN_GAME_QUEUE = 'JOIN_GAME_QUEUE',
  INIT_GAME_REQUESTED = 'INIT_GAME_REQUESTED',
  INIT_GAME_SUCCEEDED = 'INIT_GAME_SUCCEEDED',
  INIT_GAME_FAILED = 'INIT_GAME_FAILED',
  GET_AVAILABLE_MOVES_REQUESTED = 'GET_AVAILABLE_MOVES_REQUESTED',
  GET_AVAILABLE_MOVES_SUCCEEDED = 'GET_AVAILABLE_MOVES_SUCCEEDED',
  GET_AVAILABLE_MOVES_FAILED = 'GET_AVAILABLE_MOVES_FAILED',
  MAKE_MOVE_REQUESTED = 'MAKE_MOVE_REQUESTED',
  MAKE_MOVE_SUCCEEDED = 'MAKE_MOVE_SUCCEEDED',
  MAKE_MOVE_FAILED = 'MAKE_MOVE_FAILED',
  SET_SELECTED_PIECE = 'SET_SELECTED_PIECE',
}

export enum GamePersonalSubscriptionActionTypes {
  AVAILABLE_MOVES = 'AVAILABLE_MOVES',
  GAME_ERROR = 'AVAILABLE_MOVES_ERROR',
  GAME_FOUND = 'GAME_FOUND',
}

export enum GameStateSubscriptionActionTypes {
  GAME_STARTED = 'GAME_STARTED',
  PLAYER_MOVED = 'PLAYER_MOVED',
  GAME_OVER = 'GAME_OVER',
}

export const GameSubscriptionActionTypes = {
  ...GamePersonalSubscriptionActionTypes,
  ...GameStateSubscriptionActionTypes,
};

export const GameActionTypes = {
  ...GameBaseActionTypes,
  ...GameSubscriptionActionTypes,
};

export interface JoinGameQueueAction {
  type: typeof GameBaseActionTypes.JOIN_GAME_QUEUE;
}

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

export interface AvailableMovesErrorSubscriptionAction {
  type: typeof GamePersonalSubscriptionActionTypes.GAME_ERROR;
  payload: {
    error: string;
  };
}

export interface GameFoundSubscriptionAction {
  type: typeof GamePersonalSubscriptionActionTypes.GAME_FOUND;
  payload: {
    gameId: string;
  };
}

export interface SetSelectedPieceAction {
  type: typeof GameBaseActionTypes.SET_SELECTED_PIECE;
  payload: {
    position: BoardPosition;
  };
}

export interface InitGameRequestedAction {
  type: typeof GameBaseActionTypes.INIT_GAME_REQUESTED;
  payload: {
    id: string;
  };
}

export interface InitGameSucceededAction {
  type: typeof GameBaseActionTypes.INIT_GAME_SUCCEEDED;
  payload: {
    board: Board;
  };
}

export interface InitGameFailedAction {
  type: typeof GameBaseActionTypes.INIT_GAME_FAILED;
}

export interface GetAvailableMovesRequestedAction {
  type: typeof GameBaseActionTypes.GET_AVAILABLE_MOVES_REQUESTED;
  payload: {
    initialPosition: BoardPosition;
  };
}

export interface GetAvailableMovesSucceededAction {
  type: typeof GameBaseActionTypes.GET_AVAILABLE_MOVES_SUCCEEDED;
  payload: {
    availableMoves: BoardPosition[];
  };
}

export interface GetAvailableMovesFailedAction {
  type: typeof GameBaseActionTypes.GET_AVAILABLE_MOVES_FAILED;
}

export interface MakeMoveRequestedAction {
  type: typeof GameBaseActionTypes.MAKE_MOVE_REQUESTED;
  payload: {
    destinationPosition: BoardPosition;
  };
}

export interface MakeMoveSucceededAction {
  type: typeof GameBaseActionTypes.MAKE_MOVE_SUCCEEDED;
  payload: {
    board: Board;
  };
}

export interface MakeMoveFailedAction {
  type: typeof GameBaseActionTypes.MAKE_MOVE_FAILED;
}

export type GameActions =
  | InitGameRequestedAction
  | InitGameSucceededAction
  | InitGameFailedAction
  | GetAvailableMovesRequestedAction
  | GetAvailableMovesSucceededAction
  | GetAvailableMovesFailedAction
  | MakeMoveRequestedAction
  | MakeMoveSucceededAction
  | MakeMoveFailedAction
  | GameStartedSubscriptionAction
  | PlayerMovedSubscriptionAction
  | GameOverSubscriptionAction
  | AvailableMovesSubscriptionAction
  | AvailableMovesErrorSubscriptionAction
  | SetSelectedPieceAction
  | GameFoundSubscriptionAction;
