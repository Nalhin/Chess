import React from 'react';
import Game from './Game/Game.container';
import Chat from '../Chat/Chat.container';

const GameRoom = () => {
  return (
    <div data-testid="game-room">
      <Chat />
      <Game />
    </div>
  );
};

export default GameRoom;
