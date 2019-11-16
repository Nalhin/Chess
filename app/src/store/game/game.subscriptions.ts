import { map } from 'rxjs/operators';
import store from '../store';
import { GetAvailableMovesSucceeded, initGameSucceeded } from './game.actions';
import { RxStomp } from '@stomp/rx-stomp';
import { userName } from './name';

export const connectToGameSubscription = (game: RxStomp, gameId: string) => {
  return game
    .watch(`/topic/state/${gameId}`)
    .pipe(
      map(message => {
        return JSON.parse(message.body);
      }),
    )
    .subscribe(
      data => {
        console.log(data);
        //@ts-ignore
        store.dispatch(initGameSucceeded(data.payload.board.board));
      },
      error => {},
    );
};

export const availableMovesSubscription = (game: RxStomp, gameId: string) => {
  return game
    .watch(`/user/queue/personal/${gameId}`)
    .pipe(
      map(message => {
        return JSON.parse(message.body);
      }),
    )
    .subscribe(
      payload => {
        console.log(payload);
        store.dispatch(GetAvailableMovesSucceeded(payload.availableMoves));
      },
      error => {},
    );
};
