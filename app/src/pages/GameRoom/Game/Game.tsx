import React from 'react';
import { GameContainerProps } from './Game.container';
import Graveyard from './Graveyard';
import { PlayerColor } from '../../../interfaces/player';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Board from './Board';

interface GameRouterProps {
  id: string;
}

interface Props
  extends GameContainerProps,
    RouteComponentProps<GameRouterProps> {}

const Game: React.FC<Props> = ({
  board,
  initGame,
  getAvailableMoves,
  selectedPosition,
  availableMoves,
  makeMove,
  currentTurn,
  isCurrentTurn,
  graveyards,
  error,
  match,
}) => {
  React.useEffect(() => {
    initGame(match.params.id);
  }, [initGame]);

  return (
    <div>
      <div>{error}</div>
      <div>
        {currentTurn == PlayerColor.WHITE ? 'White turn' : 'Black turn'}
      </div>
      <Graveyard pieces={graveyards.blackGraveyard} />
      <Board
        board={board}
        getAvailableMoves={getAvailableMoves}
        availableMoves={availableMoves}
        makeMove={makeMove}
        selectedPosition={selectedPosition}
      />
      <Graveyard pieces={graveyards.whiteGraveyard} />
    </div>
  );
};

export default withRouter(Game);
