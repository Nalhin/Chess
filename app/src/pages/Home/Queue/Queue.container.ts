import { AppState } from '../../../store/rootReducer';
import { isInQueueSelector } from '../../../store/queue/queue.selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../../store/rootAction';
import {
  joinQueue,
  joinQueueAi,
  leaveQueue,
} from '../../../store/queue/queue.actions';
import {
  gameIsPresentRequested,
  gameReconnectRequested,
} from '../../../store/game/game.actions';
import { connect } from 'react-redux';
import Queue from './Queue';
import { isUserLoggedInSelector } from '../../../store/user/user.selectors';

const mapStateToProps = (state: AppState) => {
  const isInQueue = isInQueueSelector(state);
  const isReconnectShown = state.game.isReconnect;
  const timeJoined = state.queue.timeJoined;
  const isUserLoggedIn = isUserLoggedInSelector(state);
  return {
    isInQueue,
    isReconnectShown,
    timeJoined,
    isUserLoggedIn,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      joinQueue,
      gameIsPresent: gameIsPresentRequested,
      gameReconnect: gameReconnectRequested,
      leaveQueue,
      joinQueueAi,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Queue);

export type QueueContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
