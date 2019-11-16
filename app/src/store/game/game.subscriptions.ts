import { map } from 'rxjs/operators';
import store from '../store';
import {
  availableMoves,
  availableMovesError,
  gameOver,
  gameStarted,
  playerMoved,
} from './game.actions';
import { RxStomp } from '@stomp/rx-stomp';
import {
  GamePersonalSubscriptionActionTypes,
  GameStateSubscriptionActionTypes,
} from './game.types';

export const gameStateSubscription = (game: RxStomp, gameId: string) => {
  return game
    .watch(`/topic/state/${gameId}`)
    .pipe(
      map(message => {
        console.log(message);
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

export const gamePersonalSubscription = (game: RxStomp, gameId: string) => {
  return game
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
            store.dispatch(availableMoves(payload.availableMoves));
            break;
          case GamePersonalSubscriptionActionTypes.AVAILABLE_MOVES_ERROR:
            store.dispatch(availableMovesError(payload.availableMoves));
            break;
          default:
            break;
        }
      },
      error => {},
    );
};
