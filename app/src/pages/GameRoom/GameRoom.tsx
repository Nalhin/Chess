import React from 'react';
import Game from './Game/Game.container';
import Chat from './Chat/Chat.container';
import styled from '@emotion/styled';
import { GameRoomContainerProps } from './GameRoom.container';
import GameLoader from './GameLoader/GameLoader';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import MultiBackend, {
  MouseTransition,
  TouchTransition,
} from 'react-dnd-multi-backend';
import { useReconnect } from './useReconnect';

const StyledContainer = styled.div`
  display: flex;
`;

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      backend: TouchBackend,
      options: {
        enableMouseEvents: true,
      },
      transition: TouchTransition,
    },
  ],
};

const RECONNECT_TIMEOUT = 2000;

interface Props extends GameRoomContainerProps {}

const GameRoom: React.FC<Props> = ({
  isGameLoading,
  shouldReconnect,
  reconnectToGame,
}) => {
  useReconnect(shouldReconnect, reconnectToGame, RECONNECT_TIMEOUT);

  if (isGameLoading) {
    return <GameLoader />;
  }

  return (
    <StyledContainer>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <Game />
      </DndProvider>
      <Chat />
    </StyledContainer>
  );
};

export default GameRoom;
