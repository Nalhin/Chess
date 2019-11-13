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

const Game: React.FC<GameProps> = ({ board, initGame, makeMoveFailed }) => {
  React.useEffect(() => {
    initGame();
  }, [initGame]);

  return (
    <StyledGameContainer>
      {board.map((row, i) =>
        row.map((cell, j) => (
          <Cell key={`${i}#${j}`} type={cell && cell.type} />
        )),
      )}
      XD
      <button onClick={makeMoveFailed} />
    </StyledGameContainer>
  );
};

export default Game;
