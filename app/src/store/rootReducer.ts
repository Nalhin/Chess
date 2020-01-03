import { combineReducers } from 'redux';
import game from './game/game.reducer';
import user from './user/user.reducer';
import chat from './chat/chat.reducer';
import queue from './queue/queue.reducer';
import toaster from './toaster/toaster.reducer';
import gameHistory from './gameHistory/gameHistory.reducer';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    game,
    user,
    chat,
    queue,
    gameHistory,
    toaster,
  });

export type AppState = ReturnType<ReturnType<typeof createRootReducer>>;
