import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Game from './Game';
import { AppState } from '../../../store/rootReducer';
import { RootAction } from '../../../store/rootAction';
import {
  getAvailableMovesRequested,
  initGameRequested,
  makeMoveRequested,
} from '../../../store/game/game.actions';
import { isCurrentTurnSelector } from '../../../store/game/game.selectors';

const mapStateToProps = (state: AppState) => {
  const board = state.game.gameState.board.state;
  const currentTurn = state.game.gameState.currentTurn;
  const selectedPosition = state.game.selectedPiece.position;
  const availableMoves = state.game.selectedPiece.availableMoves;
  const graveyards = state.game.gameState.board.graveyards;
  const error = state.game.error;
  const isCurrentTurn = isCurrentTurnSelector(state);
  return {
    board,
    selectedPosition,
    availableMoves,
    currentTurn,
    isCurrentTurn,
    graveyards,
    error,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      initGame: initGameRequested,
      getAvailableMoves: getAvailableMovesRequested,
      makeMove: makeMoveRequested,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Game);

export type GameContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
