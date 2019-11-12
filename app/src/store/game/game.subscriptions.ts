import { map } from 'rxjs/operators';
import store from '../store';
import {
  GetAvailableMovesSucceeded,
  initGameSucceeded,
  makeMoveSucceeded,
} from './game.actions';
import { RxStomp } from '@stomp/rx-stomp';

export const connectToGameSubscription = (stomp: RxStomp, gameId: string) => {
  return stomp
    .watch(`/topic/board/${gameId}`)
    .pipe(
      map(message => {
        const { body, command } = message;
        return {
          body: JSON.parse(body),
          command,
        };
      }),
    )
    .subscribe(
      payload => {
        store.dispatch(initGameSucceeded(payload.body.board));
      },
      error => {},
    );
};

export const moveSubscription = (stomp: RxStomp, gameId: string) => {
  return stomp
    .watch(`/topic/move/${gameId}`)
    .pipe(
      map(message => {
        return JSON.parse(message.body);
      }),
    )
    .subscribe(
      payload => {
        store.dispatch(makeMoveSucceeded(payload.board));
      },
      error => {},
    );
};

export const availableMovesSubscription = (stomp: RxStomp, gameId: string) => {
  return stomp
    .watch(`/topic/available-moves/${gameId}`)
    .pipe(
      map(message => {
        return JSON.parse(message.body);
      }),
    )
    .subscribe(
      payload => {
        store.dispatch(GetAvailableMovesSucceeded(payload.availableMoves));
      },
      error => {},
    );
};
