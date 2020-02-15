import { queueGameFound } from '../../../../src/store/queue/queue.actions';
import { fakeGameId } from '../../game/gameId';

export const fakeQueueGameFoundMessage = {
  body: JSON.stringify(queueGameFound(fakeGameId)),
};
