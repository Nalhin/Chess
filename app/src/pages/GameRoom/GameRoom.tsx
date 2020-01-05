import React from 'react';
import Game from './Game/Game.container';
import Chat from './Chat/Chat.container';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/core';
import { GameRoomContainerProps } from './GameRoom.container';
import QueueLoader from '../../components/Loader/QueueLoader';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;

  ${props => props.theme.mediaQueries.small} {
    flex-direction: column;
  }
`;

interface Props extends GameRoomContainerProps {}

const GameRoom: React.FC<Props> = ({ isGameLoading }) => {
  const theme = useTheme();
  return (
    <StyledContainer theme={theme}>
      {isGameLoading ? (
        <>
          <h1>Loading game...</h1>
          <QueueLoader />
        </>
      ) : (
        <>
          <Game />
          <Chat />
        </>
      )}
    </StyledContainer>
  );
};

export default GameRoom;
