import { AppState } from '../../store/rootReducer';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { gameFound } from '../../store/game/game.actions';
import { connect } from 'react-redux';
import Home from './Home';
import { isAuthenticatedSelector } from '../../store/user/user.selectors';
import { isInQueueSelector } from '../../store/queue/queue.selectors';
import { joinQueue } from '../../store/queue/queue.actions';

const mapStateToProps = (state: AppState) => {
  const gameId = state.game.gameId;
  const isAuthenticated = isAuthenticatedSelector(state);
  const isInQueue = isInQueueSelector(state);
  const queueCount = state.queue.queueUserCount;
  return {
    gameId,
    isAuthenticated,
    isInQueue,
    queueCount,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      joinQueue,
      gameFound,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);

export type HomeContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
