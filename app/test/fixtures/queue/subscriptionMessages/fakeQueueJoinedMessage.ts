import { queueJoined } from '../../../../src/store/queue/queue.actions';

export const fakeQueueJoinedMessage = {
  body: JSON.stringify(queueJoined('11')),
};
