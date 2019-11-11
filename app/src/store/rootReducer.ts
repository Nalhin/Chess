import { combineReducers } from 'redux';
import game from './game/game.reducer';

export const rootReducer = combineReducers({
  game,
});

export type AppState = ReturnType<typeof rootReducer>;
