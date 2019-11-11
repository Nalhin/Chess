import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GameRoom from './GameRoom/GameRoom';

const Pages = () => {
  return (
    <div>
      <Switch>
        <Route path="/game/:id" component={GameRoom} exact />
      </Switch>
    </div>
  );
};

export default Pages;
