import { AppState } from '../../store/rootReducer';
import { userSelector } from '../../store/user/user.selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { getHistoryGamesRequested } from '../../store/gameHistory/gameHistory.actions';
import { addToast } from '../../store/toaster/toaster.action';
import { connect } from 'react-redux';
import MatchHistory from './MatchHistory';

const mapStateToProps = (state: AppState) => {
  const user = userSelector(state);
  const historyGames = state.gameHistory.historyGames.data;
  const isLoading = state.gameHistory.historyGames.isLoading;
  return {
    user,
    isLoading,
    historyGames,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    { getHistoryGames: getHistoryGamesRequested, addToast },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MatchHistory);

export type MatchHistoryContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
