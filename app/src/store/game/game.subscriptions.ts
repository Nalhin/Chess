import { map } from 'rxjs/operators';
import store from '../store';
import {
  GetAvailableMovesSucceeded,
  initGameSucceeded,
  makeMoveSucceeded,
} from './game.actions';
import { stomp } from '../stompClient';

export const connectToGameSubscription = (gameId: string) => {
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
    .subscribe(payload => {
      store.dispatch(initGameSucceeded(payload.body.board));
    });
};

export const moveSubscription = (gameId: string) => {
  return stomp
    .watch(`/topic/move/${gameId}`)
    .pipe(
      map(message => {
        return JSON.parse(message.body);
      }),
    )
    .subscribe(payload => {
      store.dispatch(makeMoveSucceeded(payload.board));
    });
};

export const availableMovesSubscription = (gameId: string) => {
  return stomp
    .watch(`/topic/available-moves/${gameId}`)
    .pipe(
      map(message => {
        return JSON.parse(message.body);
      }),
    )
    .subscribe(payload => {
      store.dispatch(GetAvailableMovesSucceeded(payload.availableMoves));
    });
};
