import { AppState } from '../../store/rootReducer';

import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { connect } from 'react-redux';
import { getHistoryGameByIdRequested } from '../../store/history/history.actions';
import IndividualGameHistory from './IndividualGameHistory';

const mapStateToProps = (state: AppState) => {
  const individualGames = state.history.individualGames.data;
  const isLoading = state.history.individualGames.isLoading;
  return {
    individualGames,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      getHistoryGameById: getHistoryGameByIdRequested,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndividualGameHistory);

export type IndividualGameHistoryContainerProps = ReturnType<
  typeof mapStateToProps
> &
  ReturnType<typeof mapDispatchToProps>;
