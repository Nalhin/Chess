import { AppState } from '../../store/rootReducer';
import { userSelector } from '../../store/user/user.selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { getMatchHistoryRequested } from '../../store/matchHistory/matchHistory.actions';
import { connect } from 'react-redux';
import MatchHistoryPage from './MatchHistoryPage';

const mapStateToProps = (state: AppState) => {
  const user = userSelector(state);
  const matches = state.matchHistory.matches.data;
  const isLoading = state.matchHistory.matches.isLoading;
  return {
    user,
    isLoading,
    matches,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators({ getMatchHistory: getMatchHistoryRequested }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MatchHistoryPage);

export type MatchHistoryContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
