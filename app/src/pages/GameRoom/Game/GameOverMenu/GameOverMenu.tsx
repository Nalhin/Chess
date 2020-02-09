import React from 'react';
import GameMenu from '../GameMenu/GameMenu';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button, Typography, useTheme } from '@material-ui/core';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.spacing(2)}px;
`;

interface Props {
  isShown: boolean;
  closeGame: () => void;
  isWinner: boolean;
}

const GameOverMenu: React.FC<Props> = ({ isShown, closeGame, isWinner }) => {
  const history = useHistory();
  const theme = useTheme();
  const goToMainMenu = () => {
    closeGame();
    history.push('/');
  };

  return (
    <GameMenu isShown={isShown} header={'Game Over'}>
      <StyledContainer theme={theme}>
        <Typography variant="h4">
          {isWinner ? 'You won' : 'You lost'}
        </Typography>
        <Button color="primary" onClick={goToMainMenu}>
          Go to main menu
        </Button>
      </StyledContainer>
    </GameMenu>
  );
};

export default GameOverMenu;
