import {
  GameActionTypes,
  GetAvailableMovesFailedAction,
  GetAvailableMovesRequestedAction,
  GetAvailableMovesSucceededAction,
  InitGameFailedAction,
  InitGameRequestedAction,
  InitGameSucceededAction,
  MakeMoveFailedAction,
  MakeMoveRequestedAction,
  MakeMoveSucceededAction,
} from './game.types';
import { Board } from '../../inferfaces/board';

export const initGameRequested = (): InitGameRequestedAction => ({
  type: GameActionTypes.INIT_GAME_REQUESTED,
});

export const initGameSucceeded = (board: Board): InitGameSucceededAction => ({
  type: GameActionTypes.INIT_GAME_SUCCEEDED,
  payload: {
    board,
  },
});

export const initGameFailed = (): InitGameFailedAction => ({
  type: GameActionTypes.INIT_GAME_FAILED,
});

export const getAvailableMovesRequested = (
  initialPosition: Position,
): GetAvailableMovesRequestedAction => ({
  type: GameActionTypes.GET_AVAILABLE_MOVES_REQUESTED,
  payload: {
    initialPosition,
  },
});

export const GetAvailableMovesSucceeded = (
  availableMoves: Position[],
): GetAvailableMovesSucceededAction => ({
  type: GameActionTypes.GET_AVAILABLE_MOVES_SUCCEEDED,
  payload: {
    availableMoves,
  },
});

export const GetAvailableMovesFailed = (): GetAvailableMovesFailedAction => ({
  type: GameActionTypes.GET_AVAILABLE_MOVES_FAILED,
});

export const makeMoveRequested = (
  initialPosition: Position,
  destinationPosition: Position,
): MakeMoveRequestedAction => ({
  type: GameActionTypes.MAKE_MOVE_REQUESTED,
  payload: {
    initialPosition,
    destinationPosition,
  },
});

export const makeMoveSucceeded = (board: Board): MakeMoveSucceededAction => ({
  type: GameActionTypes.MAKE_MOVE_SUCCEEDED,
  payload: {
    board,
  },
});

export const makeMoveFailed = (): MakeMoveFailedAction => ({
  type: GameActionTypes.MAKE_MOVE_FAILED,
});
