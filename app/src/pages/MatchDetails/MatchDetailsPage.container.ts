import { AppState } from '../../store/rootReducer';

import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { connect } from 'react-redux';
import { getMatchDetailsRequested } from '../../store/matchHistory/matchHistory.actions';
import MatchDetailsPage from './MatchDetailsPage';
import { shouldDisplayBackSelector } from '../../store/customRouter/customRouter.selectors';
import { Routes } from '../../interfaces/Router/Routes';
import { userSelector } from '../../store/user/user.selectors';

const mapStateToProps = (state: AppState) => {
  const matchDetails = state.matchHistory.matchDetails.data;
  const isLoading = state.matchHistory.matchDetails.isLoading;
  const shouldDisplayBackButton = shouldDisplayBackSelector(
    Routes.matchHistory,
  );
  const user = userSelector(state);
  return {
    matchDetails,
    isLoading,
    shouldDisplayBackButton,
    user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      getHistoryGameById: getMatchDetailsRequested,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MatchDetailsPage);

export type IndividualGameHistoryContainerProps = ReturnType<
  typeof mapStateToProps
> &
  ReturnType<typeof mapDispatchToProps>;
