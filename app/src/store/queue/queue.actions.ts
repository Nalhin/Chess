import {
  JoinQueueAction,
  QueueActionTypes,
  QueueCountAction,
  QueueErrorAction,
  QueueGameFoundAction,
  QueueJoinedAction,
} from './queue.types';

export const joinQueue = (): JoinQueueAction => ({
  type: QueueActionTypes.JOIN_QUEUE,
});

export const queueError = (error: string): QueueErrorAction => ({
  type: QueueActionTypes.QUEUE_ERROR,
  payload: {
    error,
  },
});

export const queueCount = (queueUserCount: number): QueueCountAction => ({
  type: QueueActionTypes.QUEUE_COUNT,
  payload: {
    queueUserCount,
  },
});

export const queueJoined = (timeJoined: string): QueueJoinedAction => ({
  type: QueueActionTypes.QUEUE_JOINED,
  payload: {
    timeJoined,
  },
});

export const gameFound = (gameId: string): QueueGameFoundAction => ({
  type: QueueActionTypes.QUEUE_GAME_FOUND,
  payload: {
    gameId,
  },
});
