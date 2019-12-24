import React from 'react';
import { GameContainerProps } from './Game.container';
import Cell from './Cell';
import styled from '@emotion/styled';
import Graveyard from './Graveyard';
import { PlayerColor } from '../../../interfaces/player';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface StyledGameContainerProps {
  isCurrentTurn: boolean;
}

const StyledGameContainer = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  ${(props: StyledGameContainerProps) =>
    props.isCurrentTurn && 'border:5px red solid'}
`;

interface GameRouterProps {
  id: string;
}

interface GameProps
  extends GameContainerProps,
    RouteComponentProps<GameRouterProps> {}

const Game: React.FC<GameProps> = ({
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
      <StyledGameContainer isCurrentTurn={isCurrentTurn}>
        {board.map((row, x) =>
          row.map((cell, y) => (
            <Cell
              getAvailableMoves={getAvailableMoves}
              isSelected={selectedPosition.x == x && selectedPosition.y == y}
              isMoveAvailable={availableMoves.some(
                item => item.x == x && item.y == y,
              )}
              makeMove={makeMove}
              key={`${x}#${y}`}
              position={{ x: x, y: y }}
              type={cell && cell.type}
              playerColor={cell && cell.playerColor}
            />
          )),
        )}
      </StyledGameContainer>
      <Graveyard pieces={graveyards.whiteGraveyard} />
    </div>
  );
};

export default withRouter(Game);
