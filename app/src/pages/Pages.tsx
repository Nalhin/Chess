import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GameRoom from './GameRoom/GameRoom';
import Home from './Home/Home.container';
import Login from './Login/Login';
import Register from './Register/Register';
import Navigation from './Navigation/Navigation';

const Pages = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/game/:id" component={GameRoom} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
      </Switch>
    </div>
  );
};

export default Pages;
