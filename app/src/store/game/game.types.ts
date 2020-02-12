import { Game } from '../../interfaces/Game/Game';
import { BoardPosition } from '../../interfaces/Game/BoardPosition';
import { AvailableMoves } from '../../interfaces/Game/AvailableMoves';
import { PieceType } from '../../interfaces/Game/Piece';

export interface GameState {
  readonly gameState: Game;
  readonly selectedPiece: {
    position: BoardPosition;
    availableMoves: AvailableMoves;
  };
  readonly gameId: string;
  readonly isReconnectAvailable: boolean;
}

enum GameBaseActionTypes {
  INIT_GAME = 'INIT_GAME',
  PROMOTE_PAWN = 'PROMOTE_PAWN',
  GET_AVAILABLE_MOVES = 'GET_AVAILABLE_MOVES',
  MAKE_MOVE = 'MAKE_MOVE',
  CLOSE_GAME = 'CLOSE_GAME',
  CLEAR_GAME = 'CLEAR_GAME',
  FORFEIT_GAME = 'FORFEIT_GAME',
}

enum GamePersonalSubscriptionActionTypes {
  AVAILABLE_MOVES = 'AVAILABLE_MOVES',
  ERROR = 'ERROR',
}

enum GameStateSubscriptionActionTypes {
  GAME_STARTED = 'GAME_STARTED',
  PLAYER_MOVED = 'PLAYER_MOVED',
  GAME_OVER = 'GAME_OVER',
  GAME_FORFEIT = 'GAME_FORFEIT',
}

enum GameReconnectActionTypes {
  CHECK_IS_GAME_PRESENT_REQUESTED = 'CHECK_IS_GAME_PRESENT_REQUESTED',
  CHECK_IS_GAME_PRESENT_SUCCEEDED = 'CHECK_IS_GAME_PRESENT_SUCCEEDED',
  CHECK_IS_GAME_PRESENT_FAILED = 'CHECK_IS_GAME_PRESENT_FAILED',
  RECONNECT_TO_GAME_REQUESTED = 'RECONNECT_TO_GAME_REQUESTED',
}

const GameSubscriptionActionTypes = {
  ...GamePersonalSubscriptionActionTypes,
  ...GameStateSubscriptionActionTypes,
  ...GameReconnectActionTypes,
};

export const GameActionTypes = {
  ...GameBaseActionTypes,
  ...GameSubscriptionActionTypes,
};

export interface GameStartedSubscriptionAction {
  type: typeof GameActionTypes.GAME_STARTED;
  payload: {
    game: Game;
  };
}

export interface PlayerMovedSubscriptionAction {
  type: typeof GameActionTypes.PLAYER_MOVED;
  payload: {
    game: Game;
  };
}

export interface GameOverSubscriptionAction {
  type: typeof GameActionTypes.GAME_OVER;
  payload: {
    game: Game;
  };
}

export interface AvailableMovesSubscriptionAction {
  type: typeof GameActionTypes.AVAILABLE_MOVES;
  payload: {
    availableMoves: AvailableMoves;
    position: BoardPosition;
  };
}

export interface InitGameAction {
  type: typeof GameActionTypes.INIT_GAME;
  payload: {
    id: string;
  };
}

export interface GetAvailableMovesAction {
  type: typeof GameActionTypes.GET_AVAILABLE_MOVES;
  payload: {
    initialPosition: BoardPosition;
  };
}

export interface MakeMoveRequestedAction {
  type: typeof GameActionTypes.MAKE_MOVE;
  payload: {
    destinationPosition: BoardPosition;
  };
}

export interface PromotePawnAction {
  type: typeof GameActionTypes.PROMOTE_PAWN;
  payload: {
    pieceType: PieceType;
  };
}

export interface CloseGameAction {
  type: typeof GameActionTypes.CLOSE_GAME;
}

export interface CheckIsGamePresentRequestedAction {
  type: typeof GameActionTypes.CHECK_IS_GAME_PRESENT_REQUESTED;
}

export interface CheckIsGamePresentSucceededAction {
  type: typeof GameActionTypes.CHECK_IS_GAME_PRESENT_SUCCEEDED;
  payload: {
    gameId: string;
  };
}

export interface CheckIsGamePresentFailedAction {
  type: typeof GameActionTypes.CHECK_IS_GAME_PRESENT_FAILED;
}

export interface ReconnectToGameRequestedAction {
  type: typeof GameActionTypes.RECONNECT_TO_GAME_REQUESTED;
}

export interface ClearGameAction {
  type: typeof GameActionTypes.CLEAR_GAME;
}

export interface ForfeitGameAction {
  type: typeof GameActionTypes.FORFEIT_GAME;
}

export type GameActions =
  | InitGameAction
  | GetAvailableMovesAction
  | MakeMoveRequestedAction
  | GameStartedSubscriptionAction
  | PlayerMovedSubscriptionAction
  | GameOverSubscriptionAction
  | AvailableMovesSubscriptionAction
  | PromotePawnAction
  | CloseGameAction
  | CheckIsGamePresentRequestedAction
  | CheckIsGamePresentSucceededAction
  | CheckIsGamePresentFailedAction
  | ReconnectToGameRequestedAction
  | ClearGameAction
  | ForfeitGameAction;
