export interface QueueState {
  readonly queueUserCount: number;
  readonly timeJoined: string;
}

export enum QueueBaseActionTypes {
  JOIN_QUEUE = 'JOIN_QUEUE',
  LEAVE_QUEUE = 'LEAVE_QUEUE',
}

export enum QueueSubscriptionActionTypes {
  QUEUE_ERROR = 'QUEUE_ERROR',
  QUEUE_COUNT = 'QUEUE_COUNT',
  QUEUE_JOINED = 'QUEUE_JOINED',
  QUEUE_GAME_FOUND = 'QUEUE_GAME_FOUND',
  QUEUE_LEFT = 'QUEUE_LEFT',
}

export const QueueActionTypes = {
  ...QueueBaseActionTypes,
  ...QueueSubscriptionActionTypes,
};

export interface JoinQueueAction {
  type: typeof QueueActionTypes.JOIN_QUEUE;
}

export interface QueueCountAction {
  type: typeof QueueActionTypes.QUEUE_COUNT;
  payload: {
    queueUserCount: number;
  };
}

export interface QueueJoinedAction {
  type: typeof QueueActionTypes.QUEUE_JOINED;
  payload: {
    timeJoined: string;
  };
}

export interface QueueGameFoundAction {
  type: typeof QueueActionTypes.QUEUE_GAME_FOUND;
  payload: {
    gameId: string;
  };
}

export interface LeaveQueueAction {
  type: typeof QueueActionTypes.LEAVE_QUEUE;
}

export interface QueueLeftAction {
  type: typeof QueueActionTypes.QUEUE_LEFT;
}

export type QueueActions =
  | JoinQueueAction
  | QueueCountAction
  | QueueGameFoundAction
  | QueueJoinedAction
  | LeaveQueueAction
  | QueueLeftAction;
