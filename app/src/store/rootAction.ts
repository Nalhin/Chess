import { GameActions } from './game/game.types';
import { UserActions } from './user/user.types';
import { QueueActions } from './queue/queue.types';
import { MatchHistoryActions } from './matchHistory/matchHistory.types';
import { ChatActions } from './chat/chat.types';
import { ToasterActions } from './toaster/toaster.types';
import { CustomRouterActions } from './customRouter/customRouter.types';

export type RootAction =
  | GameActions
  | UserActions
  | QueueActions
  | MatchHistoryActions
  | ChatActions
  | ToasterActions
  | CustomRouterActions;
