import React from 'react';
import Game from './Game/Game.container';
import Chat from './Chat/Chat.container';
import styled from '@emotion/styled';
import { GameRoomContainerProps } from './GameRoom.container';
import GameLoader from './GameLoader/GameLoader';
import { useTheme } from '@material-ui/core';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;

  ${props => props.theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

interface Props extends GameRoomContainerProps {}

const GameRoom: React.FC<Props> = ({ isGameLoading }) => {
  const theme = useTheme();

  if (isGameLoading) {
    return <GameLoader />;
  }

  return (
    <StyledContainer theme={theme}>
      <Game />
      <Chat />
    </StyledContainer>
  );
};

export default GameRoom;
