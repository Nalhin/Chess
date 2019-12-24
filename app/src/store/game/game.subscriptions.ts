import { map } from 'rxjs/operators';
import store from '../store';
import {
  availableMoves,
  availableMovesError,
  gameFound,
  gameOver,
  gameStarted,
  playerMoved,
} from './game.actions';
import { RxStomp } from '@stomp/rx-stomp';
import {
  GamePersonalSubscriptionActionTypes,
  GameStateSubscriptionActionTypes,
} from './game.types';

export const gameStateSubscription = (stomp: RxStomp, gameId: string) => {
  return stomp
    .watch(`/topic/state/${gameId}`)
    .pipe(
      map(message => {
        return JSON.parse(message.body);
      }),
    )
    .subscribe(
      data => {
        const { payload, type } = data;
        switch (type) {
          case GameStateSubscriptionActionTypes.GAME_STARTED:
            store.dispatch(gameStarted(payload));
            break;
          case GameStateSubscriptionActionTypes.PLAYER_MOVED:
            store.dispatch(playerMoved(payload));
            break;
          case GameStateSubscriptionActionTypes.GAME_OVER:
            store.dispatch(gameOver(payload));
            break;
          default:
            break;
        }
      },
      error => {},
    );
};

export const gamePersonalSubscription = (stomp: RxStomp, gameId: string) => {
  return stomp
    .watch(`/user/queue/personal/${gameId}`)
    .pipe(
      map(message => {
        return JSON.parse(message.body);
      }),
    )
    .subscribe(
      data => {
        const { payload, type } = data;
        switch (type) {
          case GamePersonalSubscriptionActionTypes.AVAILABLE_MOVES:
            store.dispatch(
              availableMoves(payload.availableMoves, payload.position),
            );
            break;
          case GamePersonalSubscriptionActionTypes.GAME_ERROR:
            store.dispatch(availableMovesError(payload.error));
            break;
          default:
            break;
        }
      },
      error => {},
    );
};

export const gameQueueSubscription = (stomp: RxStomp) => {
  return stomp
    .watch(`/user/queue/personal`)
    .pipe(
      map(message => {
        return JSON.parse(message.body);
      }),
    )
    .subscribe(
      data => {
        const { payload } = data;
        store.dispatch(gameFound(payload.gameId));
      },
      error => {},
    );
};
