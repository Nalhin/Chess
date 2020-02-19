import { queueGameFound } from '../../../../src/store/queue/queue.actions';
import { fakeGameId } from '../../game/fakeGameId';

export const fakeQueueGameFoundMessage = {
  body: JSON.stringify(queueGameFound(fakeGameId)),
};
