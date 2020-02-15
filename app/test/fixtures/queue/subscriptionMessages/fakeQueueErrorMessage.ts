import { queueError } from '../../../../src/store/queue/queue.actions';

export const fakeQueueErrorMessage = {
  body: JSON.stringify(queueError('error')),
};
