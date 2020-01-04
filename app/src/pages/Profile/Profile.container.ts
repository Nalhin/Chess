import { AppState } from '../../store/rootReducer';
import { userSelector } from '../../store/user/user.selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { connect } from 'react-redux';
import Profile from './Profile';
import { addToast } from '../../store/toaster/toaster.action';

const mapStateToProps = (state: AppState) => {
  const user = userSelector(state);
  return {
    user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators({ addToast }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

export type ProfileContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
