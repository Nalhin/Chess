import { combineReducers } from 'redux';
import game from './game/game.reducer';
import user from './user/user.reducer';

export const rootReducer = combineReducers({
  game,
  user,
});

export type AppState = ReturnType<typeof rootReducer>;
