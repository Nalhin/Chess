import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GameRoom from './GameRoom/GameRoom';
import Home from './Home/Home.container';

const Pages = () => {
  return (
    <div>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/game/:id" component={GameRoom} exact />
      </Switch>
    </div>
  );
};

export default Pages;
