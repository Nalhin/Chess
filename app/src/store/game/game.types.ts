import { Board } from '../../inferfaces/board';
import { Piece } from '../../inferfaces/piece';

export interface GameState {
  readonly board: Piece[][];
  readonly availableMoves: Position[];
}

export enum GameActionTypes {
  INIT_GAME_REQUESTED = 'INIT_GAME_REQUESTED',
  INIT_GAME_SUCCEEDED = 'INIT_GAME_SUCCEEDED',
  INIT_GAME_FAILED = 'INIT_GAME_FAILED',
  GET_AVAILABLE_MOVES_REQUESTED = 'GET_AVAILABLE_MOVES_REQUESTED',
  GET_AVAILABLE_MOVES_SUCCEEDED = 'GET_AVAILABLE_MOVES_SUCCEEDED',
  GET_AVAILABLE_MOVES_FAILED = 'GET_AVAILABLE_MOVES_FAILED',
  MAKE_MOVE_REQUESTED = 'MAKE_MOVE_REQUESTED',
  MAKE_MOVE_SUCCEEDED = 'MAKE_MOVE_SUCCEEDED',
  MAKE_MOVE_FAILED = 'MAKE_MOVE_FAILED',
}

export interface InitGameRequestedAction {
  type: typeof GameActionTypes.INIT_GAME_REQUESTED;
}

export interface InitGameSucceededAction {
  type: typeof GameActionTypes.INIT_GAME_SUCCEEDED;
  payload: {
    board: Board;
  };
}

export interface InitGameFailedAction {
  type: typeof GameActionTypes.INIT_GAME_FAILED;
}

export interface GetAvailableMovesRequestedAction {
  type: typeof GameActionTypes.GET_AVAILABLE_MOVES_REQUESTED;
  payload: {
    initialPosition: Position;
  };
}

export interface GetAvailableMovesSucceededAction {
  type: typeof GameActionTypes.GET_AVAILABLE_MOVES_SUCCEEDED;
  payload: {
    availableMoves: Position[];
  };
}

export interface GetAvailableMovesFailedAction {
  type: typeof GameActionTypes.GET_AVAILABLE_MOVES_FAILED;
}

export interface MakeMoveRequestedAction {
  type: typeof GameActionTypes.MAKE_MOVE_REQUESTED;
  payload: {
    initialPosition: Position;
    destinationPosition: Position;
  };
}

export interface MakeMoveSucceededAction {
  type: typeof GameActionTypes.MAKE_MOVE_SUCCEEDED;
  payload: {
    board: Board;
  };
}

export interface MakeMoveFailedAction {
  type: typeof GameActionTypes.MAKE_MOVE_FAILED;
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
  | MakeMoveFailedAction;
