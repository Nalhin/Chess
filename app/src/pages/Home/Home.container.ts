import { AppState } from '../../store/rootReducer';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { connect } from 'react-redux';
import Home from './Home';
import { isAuthenticatedSelector } from '../../store/user/user.selectors';
import { isInQueueSelector } from '../../store/queue/queue.selectors';
import { joinQueue } from '../../store/queue/queue.actions';
import {
  gameIsPresentRequested,
  gameReconnectRequested,
} from '../../store/game/game.actions';

const mapStateToProps = (state: AppState) => {
  const isAuthenticated = isAuthenticatedSelector(state);
  const isInQueue = isInQueueSelector(state);
  const queueCount = state.queue.queueUserCount;
  const isReconnectShown = state.game.isReconnect;
  return {
    isAuthenticated,
    isInQueue,
    queueCount,
    isReconnectShown,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      joinQueue,
      gameIsPresent: gameIsPresentRequested,
      gameReconnect: gameReconnectRequested,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);

export type HomeContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
