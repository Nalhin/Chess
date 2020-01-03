import { AppState } from '../../store/rootReducer';

import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { connect } from 'react-redux';
import { getHistoryGameByIdRequested } from '../../store/gameHistory/gameHistory.actions';
import IndividualGameHistory from './IndividualGameHistory';

const mapStateToProps = (state: AppState) => {
  const individualGames = state.gameHistory.individualGames.data;
  const isLoading = state.gameHistory.individualGames.isLoading;
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
