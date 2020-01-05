import { AppState } from '../../store/rootReducer';
import { isGameLoadingSelector } from '../../store/game/game.selectors';

import { connect } from 'react-redux';

import GameRoom from './GameRoom';

const mapStateToProps = (state: AppState) => {
  const isGameLoading = isGameLoadingSelector(state);

  return {
    isGameLoading,
  };
};

export default connect(mapStateToProps)(GameRoom);

export type GameRoomContainerProps = ReturnType<typeof mapStateToProps>;
