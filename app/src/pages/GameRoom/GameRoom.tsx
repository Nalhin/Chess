import React from 'react';
import Game from './Game/Game.container';
import Chat from '../Chat/Chat.container';
import { Link, withRouter } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const GameRoom = () => {
  return (
    <StyledContainer data-testid="game-room">
      <Link to="/">back</Link>
      <Game />
      <Chat />
    </StyledContainer>
  );
};

export default withRouter(GameRoom);
