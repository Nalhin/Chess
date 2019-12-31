import React from 'react';
import { GameContainerProps } from './Game.container';
import Graveyard from './Graveyard';
import { PlayerColor } from '../../../interfaces/player';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Board from './Board';
import PromotionMenu from './PromotionMenu/PromotionMenu';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  position: relative;
`;

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
  positionAwaitingPromotion,
  promotePawn,
}) => {
  //TODO refactor
  // React.useEffect(() => {
  //   initGame(match.params.id);
  // }, [initGame]);

  return (
    <StyledContainer>
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
      {positionAwaitingPromotion && isCurrentTurn && (
        <PromotionMenu
          playerColor={currentTurn}
          positionAwaitingPromotion={positionAwaitingPromotion}
          promotePawn={promotePawn}
        />
      )}
      <Graveyard pieces={graveyards.whiteGraveyard} />
    </StyledContainer>
  );
};

export default withRouter(Game);
