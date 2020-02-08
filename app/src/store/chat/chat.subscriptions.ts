import { RxStomp } from '@stomp/rx-stomp';
import { map } from 'rxjs/operators';
import { newMessageReceived } from './chat.actions';
import { store } from '../../App';

export const chatSubscription = (
  stomp: RxStomp,
  chatId: string,
  login: string,
) => {
  return stomp
    .watch(`/topic/chat/${chatId}`, { login })
    .pipe(
      map(message => {
        return JSON.parse(message.body);
      }),
    )
    .subscribe(data => {
      store.dispatch(newMessageReceived(data));
    });
};
