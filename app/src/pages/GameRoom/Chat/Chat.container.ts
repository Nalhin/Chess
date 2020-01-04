import { AppState } from '../../../store/rootReducer';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../../store/rootAction';
import { connect } from 'react-redux';
import Chat from './Chat';
import { sendMessage } from '../../../store/chat/chat.actions';
import { userSelector } from '../../../store/user/user.selectors';

const mapStateToProps = (state: AppState) => {
  const chatMessages = state.chat.messages;
  const userLogin = userSelector(state).login;
  return {
    chatMessages,
    userLogin,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      sendMessage,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

export type ChatContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
