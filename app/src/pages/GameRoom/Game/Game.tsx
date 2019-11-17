import React from 'react';
import { GameContainerProps } from './Game.container';
import Cell from './Cell';
import styled from '@emotion/styled';

interface GameProps extends GameContainerProps {}

const StyledGameContainer = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
`;

const Game: React.FC<GameProps> = ({
  board,
  initGame,
  getAvailableMoves,
  selectedPosition,
  availableMoves,
}) => {
  React.useEffect(() => {
    initGame();
  }, [initGame]);

  return (
    <StyledGameContainer>
      {board.map((row, x) =>
        row.map((cell, y) => {
          return (
            <Cell
              getAvailableMoves={getAvailableMoves}
              isSelected={selectedPosition.x == x && selectedPosition.y == y}
              isMoveAvailable={availableMoves.some(
                item => item.x == x && item.y == y,
              )}
              key={`${x}#${y}`}
              position={{ x: x, y: y }}
              type={cell && cell.type}
            />
          );
        }),
      )}
    </StyledGameContainer>
  );
};

export default Game;
