import React from 'react';
import GameMenu from '../GameMenu/GameMenu';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button, Typography, useTheme } from '@material-ui/core';
import { Routes } from '../../../../interfaces/Router/Routes';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.spacing(2)}px;
`;

const StyledTypography = styled(Typography)`
  padding-bottom: ${props => props.theme.spacing(2)}px;
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
    history.push(Routes.home);
  };

  return (
    <GameMenu isShown={isShown} header={'Game over!'}>
      <StyledContainer theme={theme}>
        <StyledTypography variant="h4" theme={theme}>
          {isWinner ? 'You won' : 'You lost'}
        </StyledTypography>
        <Button color="primary" onClick={goToMainMenu} variant="contained">
          Go to main menu
        </Button>
      </StyledContainer>
    </GameMenu>
  );
};

export default GameOverMenu;
