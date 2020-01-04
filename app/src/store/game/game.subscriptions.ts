import { map } from 'rxjs/operators';
import {
  availableMoves,
  gameOver,
  gameStarted,
  playerMoved,
} from './game.actions';
import { RxStomp } from '@stomp/rx-stomp';
import {
  GamePersonalSubscriptionActionTypes,
  GameStateSubscriptionActionTypes,
} from './game.types';
import { store } from '../../App';
import { addToast } from '../toaster/toaster.action';
import { generateToast } from '../../utils/toastFactory';
import { ToastTypes } from '../../interfaces/ToastTypes';

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

export const gamePersonalSubscription = (
  stomp: RxStomp,
  gameId: string,
  login: string,
) => {
  return stomp
    .watch(`/queue/personal/${login}/${gameId}`)
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
          case GamePersonalSubscriptionActionTypes.ERROR:
            store.dispatch(
              addToast(generateToast(payload.error, ToastTypes.ERROR)),
            );
            break;
          default:
            break;
        }
      },
      error => {},
    );
};
