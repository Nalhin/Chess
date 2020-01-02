import { GameActions } from './game/game.types';
import { UserActions } from './user/user.types';
import { QueueActions } from './queue/queue.types';
import { HistoryActions } from './history/history.types';
import { ChatActions } from './chat/chat.types';

export type RootAction =
  | GameActions
  | UserActions
  | QueueActions
  | HistoryActions
  | ChatActions;
