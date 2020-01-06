import React from 'react';
import GameMenu from '../GameMenu/GameMenu';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/core';
import Button from '../../../../components/Button/Button';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.space.large}px;
`;

const StyledTitle = styled.h2`
  font-weight: ${props => props.theme.fontWeights.heading};
  font-size: ${props => props.theme.fontSizes.larger}px;
`;

interface Props {
  isShown: boolean;
  closeGame: () => void;
}

const GameOverMenu: React.FC<Props> = ({ isShown, closeGame }) => {
  const history = useHistory();
  const theme = useTheme();
  const goToMainMenu = () => {
    closeGame();
    history.push('/');
  };

  return (
    <GameMenu isShown={isShown}>
      <StyledContainer theme={theme}>
        <StyledTitle>Game Over</StyledTitle>
        <Button onClick={goToMainMenu}>Go to main menu</Button>
      </StyledContainer>
    </GameMenu>
  );
};

export default GameOverMenu;
