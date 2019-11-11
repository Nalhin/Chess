import React from 'react';
import { GameContainerProps } from './Game.container';
import Cell from './Cell';

interface GameProps extends GameContainerProps {}

const Game: React.FC<GameProps> = ({ board, initGame }) => {
  React.useEffect(() => {
    initGame();
  }, [initGame]);

  return (
    <div>
      {board.map((row, i) => {
        row.map((cell, j) => <Cell key={`${i}#${j}`} />);
      })}
      XD
    </div>
  );
};

export default Game;
