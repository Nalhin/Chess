import React from 'react';
import Game from './Game/Game.container';
import Chat from '../Chat/Chat.container';
import { Link, withRouter } from 'react-router-dom';

const GameRoom = () => {
  return (
    <div data-testid="game-room">
      <Chat />
      <Game />
      <Link to="/">back</Link>
    </div>
  );
};

export default withRouter(GameRoom);
