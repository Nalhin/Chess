import { AppState } from '../../store/rootReducer';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { connect } from 'react-redux';
import Chat from './Chat';
import {
  closeChat,
  initChat,
  sendMessage,
} from '../../store/chat/chat.actions';

const mapStateToProps = (state: AppState) => {
  const chatMessages = state.chat.messages;
  const user = state.user.name;
  return {
    chatMessages,
    user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      sendMessage,
      initChat,
      closeChat,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

export type ChatContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
