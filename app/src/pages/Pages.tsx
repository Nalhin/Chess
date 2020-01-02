import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GameRoom from './GameRoom/GameRoom';
import Home from './Home/Home.container';
import Navigation from './Navigation/Navigation';
import ProtectedRoute from '../components/UnauthenticatedRoute/UnauthenticatedRoute';
import Profile from './Profile/Profile.container';
import Login from './Login/Login';
import Register from './Register/Register';
import IndividualGameHistory from './IndividualGameHistory/IndividualGameHistory.container';

const Pages = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/" component={Home} exact />
        <ProtectedRoute path="/game/:id" component={GameRoom} exact />
        <ProtectedRoute path="/profile" component={Profile} exact />
        <ProtectedRoute
          path="/profile/game/:id"
          component={IndividualGameHistory}
          exact
        />
        <ProtectedRoute
          withAuthentication
          path="/login"
          component={Login}
          exact
        />
        <ProtectedRoute
          withAuthentication
          path="/register"
          component={Register}
          exact
        />
      </Switch>
    </div>
  );
};

export default Pages;
