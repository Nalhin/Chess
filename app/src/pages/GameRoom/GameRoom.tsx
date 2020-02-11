import React from 'react';
import Game from './Game/Game.container';
import Chat from './Chat/Chat.container';
import styled from '@emotion/styled';
import { GameRoomContainerProps } from './GameRoom.container';
import GameLoader from './GameLoader/GameLoader';

const StyledContainer = styled.div`
  display: flex;
`;

interface Props extends GameRoomContainerProps {}

const GameRoom: React.FC<Props> = ({
  isGameLoading,
  shouldReconnect,
  reconnectToGame,
}) => {
  React.useEffect(() => {
    if (shouldReconnect) {
      reconnectToGame();
    }
  }, [shouldReconnect]);

  if (isGameLoading) {
    return <GameLoader />;
  }

  return (
    <StyledContainer>
      <Game />
      <Chat />
    </StyledContainer>
  );
};

export default GameRoom;
