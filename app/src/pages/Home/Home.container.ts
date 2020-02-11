import { AppState } from '../../store/rootReducer';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { connect } from 'react-redux';
import Home from './Home';
import { isAuthenticatedSelector } from '../../store/user/user.selectors';
import { registerUserRequested } from '../../store/user/user.actions';

const mapStateToProps = (state: AppState) => {
  const isAuthenticated = isAuthenticatedSelector(state);
  return {
    isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      registerUser: registerUserRequested,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);

export type HomeContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
