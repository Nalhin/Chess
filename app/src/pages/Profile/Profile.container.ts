import { AppState } from '../../store/rootReducer';
import { userSelector } from '../../store/user/user.selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getHistoryGamesRequested } from '../../store/gameHistory/gameHistory.actions';
import { addToast } from '../../store/toaster/toaster.action';

const mapStateToProps = (state: AppState) => {
  const user = userSelector(state);
  const historyGames = state.gameHistory.historyGames.data;
  const isHistoryLoading = state.gameHistory.historyGames.isLoading;
  return {
    user,
    isHistoryLoading,
    historyGames,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    { getHistoryGames: getHistoryGamesRequested, addToast },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

export type ProfileContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
