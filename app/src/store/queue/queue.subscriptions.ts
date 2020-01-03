import { RxStomp } from '@stomp/rx-stomp';
import { map } from 'rxjs/operators';
import { QueueActionTypes } from './queue.types';
import { gameFound, queueCount, queueJoined } from './queue.actions';
import { store } from '../../App';
import { addToast } from '../toaster/toaster.action';
import { generateToast } from '../../utils/toastFactory';
import { ToastTypes } from '../../interfaces/ToastTypes';

export const queueStateSubscription = (stomp: RxStomp) => {
  return stomp
    .watch(`/topic/state`)
    .pipe(
      map(message => {
        return JSON.parse(message.body);
      }),
    )
    .subscribe(
      data => {
        const { payload, type } = data;
        switch (type) {
          case QueueActionTypes.QUEUE_COUNT:
            store.dispatch(queueCount(payload.queueUserCount));
            break;
        }
      },
      error => {},
    );
};

export const queuePersonalSubscription = (stomp: RxStomp, login: string) => {
  return stomp
    .watch(`/queue/personal/${login}`)
    .pipe(
      map(message => {
        return JSON.parse(message.body);
      }),
    )
    .subscribe(
      data => {
        const { payload, type } = data;
        switch (type) {
          case QueueActionTypes.QUEUE_JOINED:
            store.dispatch(queueJoined(payload.gameId));
            break;
          case QueueActionTypes.QUEUE_ERROR:
            store.dispatch(
              addToast(generateToast(payload.error, ToastTypes.ERROR)),
            );
            break;
          case QueueActionTypes.QUEUE_GAME_FOUND:
            store.dispatch(gameFound(payload.gameId));
        }
      },
      error => {},
    );
};
