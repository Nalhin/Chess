import { map } from 'rxjs/operators';
import {
  availableMoves,
  gameOver,
  gameStarted,
  playerMoved,
} from './game.actions';
import { RxStomp } from '@stomp/rx-stomp';
import { GameActionTypes } from './game.types';
import { addToast } from '../toaster/toaster.action';
import { generateToast } from '../../utils/generateToast';
import { ToastTypes } from '../../interfaces/Toaster/ToastTypes';
import { store } from '../store';

export const gameStateSubscription = (stomp: RxStomp, gameId: string) => {
  return stomp
    .watch(`/topic/state/${gameId}`)
    .pipe(
      map(message => {
        return JSON.parse(message.body);
      }),
    )
    .subscribe(data => {
      const { payload, type } = data;
      switch (type) {
        case GameActionTypes.GAME_STARTED:
          store.dispatch(gameStarted(payload));
          break;
        case GameActionTypes.PLAYER_MOVED:
          store.dispatch(playerMoved(payload));
          break;
        case GameActionTypes.GAME_OVER:
          store.dispatch(gameOver(payload));
          break;
        case GameActionTypes.GAME_FORFEIT:
          store.dispatch(playerMoved(payload.game));
          store.dispatch(
            addToast(
              generateToast(
                `${payload.name} forfeit the game!`,
                ToastTypes.Info,
              ),
            ),
          );
          break;
        default:
          break;
      }
    });
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
    .subscribe(data => {
      const { payload, type } = data;
      switch (type) {
        case GameActionTypes.AVAILABLE_MOVES:
          store.dispatch(
            availableMoves(payload.availableMoves, payload.position),
          );
          break;
        case GameActionTypes.ERROR:
          store.dispatch(
            addToast(generateToast(payload.error, ToastTypes.Error)),
          );
          break;
        default:
          break;
      }
    });
};
