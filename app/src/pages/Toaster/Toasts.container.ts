import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { connect } from 'react-redux';
import { AppState } from '../../store/rootReducer';
import { removeToast } from '../../store/toaster/toaster.action';
import Toasts from './Toasts';

const mapStateToProps = (state: AppState) => {
  const toastData = state.toaster.toasterData;
  return {
    toastData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      removeToast,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Toasts);

export type ToasterContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
