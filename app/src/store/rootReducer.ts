import { combineReducers } from 'redux';
import game from './game/game.reducer';
import user from './user/user.reducer';
import chat from './chat/chat.reducer';
import queue from './queue/queue.reducer';
import toaster from './toaster/toaster.reducer';
import matchHistory from './matchHistory/matchHistory.reducer';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import customRouter from './customRouter/customRouter.reducer';

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    customRouter,
    game,
    user,
    chat,
    queue,
    matchHistory,
    toaster,
  });

export type AppState = ReturnType<ReturnType<typeof createRootReducer>>;
