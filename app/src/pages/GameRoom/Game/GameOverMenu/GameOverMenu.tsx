import React from 'react';
import GameMenu from '../GameMenu/GameMenu';
import { useHistory } from 'react-router-dom';

interface Props {
  isShown: boolean;
  closeGame: () => void;
}

const GameOverMenu: React.FC<Props> = ({ isShown, closeGame }) => {
  const history = useHistory();

  const goToMainMenu = () => {
    history.push('/');
    closeGame();
  };

  return (
    <GameMenu isShown={isShown}>
      <span>Game Over</span>
      <button onClick={goToMainMenu}>Go to main menu</button>
    </GameMenu>
  );
};

export default GameOverMenu;
