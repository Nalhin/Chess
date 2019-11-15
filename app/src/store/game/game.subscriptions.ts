import { map } from 'rxjs/operators';
import store from '../store';
import {
  GetAvailableMovesSucceeded,
  initGameSucceeded,
  makeMoveSucceeded,
} from './game.actions';
import { RxStomp } from '@stomp/rx-stomp';

export const connectToGameSubscription = (game: RxStomp, gameId: string) => {
  return game
    .watch(`/topic/board/${gameId}`)
    .pipe(
      map(message => {
        const { body } = message;
        return {
          body: JSON.parse(body),
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

export const moveSubscription = (game: RxStomp, gameId: string) => {
  return game
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

export const availableMovesSubscription = (game: RxStomp, gameId: string) => {
  return game
    .watch(`/user/queue/available-moves/${gameId}`)
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
