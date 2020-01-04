import { AppState } from '../../store/rootReducer';

import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { connect } from 'react-redux';
import { getHistoryGameByIdRequested } from '../../store/gameHistory/gameHistory.actions';
import IndividualMatchHistory from './IndividualMatchHistory';
import { shouldDisplayBack } from '../../store/router/router.selectors';
import { locations } from '../../contants/locations';

const mapStateToProps = (state: AppState) => {
  const individualGames = state.gameHistory.individualGames.data;
  const isLoading = state.gameHistory.individualGames.isLoading;
  const shouldDisplayBackButton = shouldDisplayBack(
    state,
    locations.matchHistory,
  );
  return {
    individualGames,
    isLoading,
    shouldDisplayBackButton,
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
)(IndividualMatchHistory);

export type IndividualGameHistoryContainerProps = ReturnType<
  typeof mapStateToProps
> &
  ReturnType<typeof mapDispatchToProps>;
