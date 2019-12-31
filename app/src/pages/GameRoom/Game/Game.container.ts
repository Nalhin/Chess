import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Game from './Game';
import { AppState } from '../../../store/rootReducer';
import { RootAction } from '../../../store/rootAction';
import {
  closeGame,
  getAvailableMovesRequested,
  initGameRequested,
  makeMoveRequested,
  promotePawn,
} from '../../../store/game/game.actions';
import { isCurrentTurnSelector } from '../../../store/game/game.selectors';

const mapStateToProps = (state: AppState) => {
  const selectedPosition = state.game.selectedPiece.position;
  const availableMoves = state.game.selectedPiece.availableMoves;
  const error = state.game.error;
  const isCurrentTurn = isCurrentTurnSelector(state);
  const gameState = state.game.gameState;
  return {
    selectedPosition,
    availableMoves,
    isCurrentTurn,
    error,
    gameState,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      initGame: initGameRequested,
      getAvailableMoves: getAvailableMovesRequested,
      makeMove: makeMoveRequested,
      promotePawn,
      closeGame,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Game);

export type GameContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
