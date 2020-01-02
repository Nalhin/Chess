import { AppState } from '../../store/rootReducer';
import { userSelector } from '../../store/user/user.selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getHistoryGamesRequested } from '../../store/history/history.actions';

const mapStateToProps = (state: AppState) => {
  const user = userSelector(state);
  const historyGames = state.history.historyGames.data;
  const isLoading = state.history.historyGames.isLoading;
  return {
    user,
    isLoading,
    historyGames,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators({ getHistoryGames: getHistoryGamesRequested }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

export type ProfileContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
