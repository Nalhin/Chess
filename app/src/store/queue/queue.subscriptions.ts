import { RxStomp } from '@stomp/rx-stomp';
import { map } from 'rxjs/operators';
import { QueueActionTypes } from './queue.types';
import { gameFound, queueJoined, queueLeft } from './queue.actions';
import { store } from '../store';
import { addToast } from '../toaster/toaster.action';
import { generateToast } from '../../utils/toastFactory';
import { ToastTypes } from '../../interfaces/Toaster/ToastTypes';

export const queuePersonalSubscription = (stomp: RxStomp, login: string) => {
  return stomp
    .watch(`/queue/personal/${login}`)
    .pipe(
      map(message => {
        return JSON.parse(message.body);
      }),
    )
    .subscribe(data => {
      const { payload, type } = data;
      switch (type) {
        case QueueActionTypes.QUEUE_JOINED:
          store.dispatch(queueJoined(payload.timeJoined));
          break;
        case QueueActionTypes.QUEUE_ERROR:
          store.dispatch(
            addToast(generateToast(payload.error, ToastTypes.Error)),
          );
          break;
        case QueueActionTypes.QUEUE_GAME_FOUND:
          store.dispatch(gameFound(payload.gameId));
          break;
        case QueueActionTypes.QUEUE_LEFT:
          store.dispatch(queueLeft());
          store.dispatch(
            addToast(
              generateToast(
                `You (${payload.name}) left the queue`,
                ToastTypes.Info,
              ),
            ),
          );
          break;
      }
    });
};
