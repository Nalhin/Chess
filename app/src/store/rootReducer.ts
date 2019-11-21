import { combineReducers } from 'redux';
import game from './game/game.reducer';
import user from './user/user.reducer';
import chat from './chat/chat.reducer';

export const rootReducer = combineReducers({
  game,
  user,
  chat,
});

export type AppState = ReturnType<typeof rootReducer>;
