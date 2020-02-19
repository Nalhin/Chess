import { queueLeft } from '../../../../src/store/queue/queue.actions';
import { fakeUser } from '../../user/fakeUser';

export const fakeQueueLeftMessage = {
  body: JSON.stringify(queueLeft(fakeUser.login)),
};
