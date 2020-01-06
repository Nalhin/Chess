import { QueueActions, QueueActionTypes, QueueState } from './queue.types';
import { Reducer } from 'redux';
import produce from 'immer';

export const QUEUE_INITIAL_STATE: QueueState = {
  queueUserCount: 0,
  timeJoined: '',
};

const queueReducer: Reducer<QueueState, QueueActions> = (
  state = QUEUE_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case QueueActionTypes.QUEUE_COUNT:
        draft.queueUserCount = action.payload.queueUserCount;
        break;
      case QueueActionTypes.QUEUE_JOINED:
        draft.timeJoined = action.payload.timeJoined;
        break;
      case QueueActionTypes.QUEUE_GAME_FOUND:
      case QueueActionTypes.QUEUE_LEFT:
        draft.timeJoined = '';
        break;
      default:
        break;
    }
  });
};

export default queueReducer;
