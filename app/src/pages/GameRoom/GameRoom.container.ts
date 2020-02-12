import { AppState } from '../../store/rootReducer';
import { isGameLoadingSelector } from '../../store/game/game.selectors';

import { connect } from 'react-redux';

import GameRoom from './GameRoom';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { reconnectToGame } from '../../store/game/game.actions';
import { isUserLoggedInSelector } from '../../store/user/user.selectors';

const mapStateToProps = (state: AppState) => {
  const isGameLoading = isGameLoadingSelector(state);
  const gameId = state.game.gameId;
  const shouldReconnect = isUserLoggedInSelector(state) && !gameId;

  return {
    isGameLoading,
    shouldReconnect,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      reconnectToGame,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom);

export type GameRoomContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
