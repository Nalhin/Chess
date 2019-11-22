import { RxStomp } from '@stomp/rx-stomp';
import { map } from 'rxjs/operators';
import store from '../store';
import { newMessageReceived } from './chat.actions';

export const chatSubscription = (stomp: RxStomp, chatId: string) => {
  return stomp
    .watch(`/topic/chat/${chatId}`)
    .pipe(
      map(message => {
        return JSON.parse(message.body);
      }),
    )
    .subscribe(
      data => {
        console.log(data);
        store.dispatch(newMessageReceived(data));
      },
      error => {},
    );
};
