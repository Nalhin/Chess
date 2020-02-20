import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Game from './Game';
import { AppState } from '../../../store/rootReducer';
import { RootAction } from '../../../store/rootAction';
import {
  closeGame,
  forfeitGame,
  getAvailableMoves,
  initGame,
  makeMoveRequested,
  promotePawn,
} from '../../../store/game/game.actions';
import {
  isCurrentTurnSelector,
  userColorSelector,
} from '../../../store/game/game.selectors';

const mapStateToProps = (state: AppState) => {
  const selectedPosition = state.game.selectedPiece.position;
  const availableMoves = state.game.selectedPiece.availableMoves;
  const isCurrentTurn = isCurrentTurnSelector(state);
  const gameState = state.game.gameState;
  const userColor = userColorSelector(state);
  return {
    selectedPosition,
    availableMoves,
    isCurrentTurn,
    gameState,
    userColor,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      initGame: initGame,
      getAvailableMoves,
      makeMove: makeMoveRequested,
      promotePawn,
      closeGame,
      forfeitGame,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Game);

export type GameContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
