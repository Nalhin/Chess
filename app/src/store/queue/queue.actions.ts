import {
  JoinQueueAction,
  JoinQueueAiAction,
  LeaveQueueAction,
  QueueActionTypes,
  QueueErrorAction,
  QueueGameFoundAction,
  QueueJoinedAction,
  QueueLeftAction,
} from './queue.types';

export const joinQueue = (): JoinQueueAction => ({
  type: QueueActionTypes.JOIN_QUEUE,
});

export const queueJoined = (timeJoined: string): QueueJoinedAction => ({
  type: QueueActionTypes.QUEUE_JOINED,
  payload: {
    timeJoined,
  },
});

export const queueGameFound = (gameId: string): QueueGameFoundAction => ({
  type: QueueActionTypes.QUEUE_GAME_FOUND,
  payload: {
    gameId,
  },
});

export const queueLeft = (name: string): QueueLeftAction => ({
  type: QueueActionTypes.QUEUE_LEFT,
  payload: {
    name,
  },
});

export const leaveQueue = (): LeaveQueueAction => ({
  type: QueueActionTypes.LEAVE_QUEUE,
});

export const joinQueueAi = (): JoinQueueAiAction => ({
  type: QueueActionTypes.JOIN_QUEUE_AI,
});

export const queueError = (error: string): QueueErrorAction => ({
  type: QueueActionTypes.QUEUE_ERROR,
  payload: {
    error,
  },
});
