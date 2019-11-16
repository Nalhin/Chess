import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Game from './Game';
import { AppState } from '../../../store/rootReducer';
import { RootAction } from '../../../store/rootAction';
import {
  initGameRequested,
  makeMoveFailed,
} from '../../../store/game/game.actions';

const mapStateToProps = (state: AppState) => {
  const board = state.game.game.board.state;

  return {
    board,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      initGame: initGameRequested,
      makeMoveFailed,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Game);

export type GameContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
