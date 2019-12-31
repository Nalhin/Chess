import { AppState } from '../rootReducer';
import { QUEUE_INITIAL_STATE } from './queue.reducer';

export const isInQueueSelector = (state: AppState) =>
  state.queue.queueUserCount !== QUEUE_INITIAL_STATE.queueUserCount &&
  state.queue.timeJoined !== QUEUE_INITIAL_STATE.timeJoined;
