import { AppState } from '../../store/rootReducer';
import { isAuthenticatedSelector } from '../../store/user/user.selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';

import { connect } from 'react-redux';
import { logoutUser } from '../../store/user/user.actions';
import Navigation from './Navigation';

const mapStateToProps = (state: AppState) => {
  const isAuthenticated = isAuthenticatedSelector(state);
  return {
    isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators({ logoutUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

export type NavigationContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
