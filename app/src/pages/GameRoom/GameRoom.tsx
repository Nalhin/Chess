import React from 'react';
import Game from './Game/Game.container';
import Chat from './Chat/Chat.container';
import { withRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/core';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;

  ${props => props.theme.mediaQueries.small} {
    flex-direction: column;
  }
`;

const GameRoom = () => {
  const theme = useTheme();
  return (
    <StyledContainer theme={theme}>
      <Game />
      <Chat />
    </StyledContainer>
  );
};

export default withRouter(GameRoom);
