import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './Navigation/Navigation.container';
import ProtectedRoute from '../components/UnauthenticatedRoute/UnauthenticatedRoute';
import Toasts from './Toaster/Toasts.container';
import styled from '@emotion/styled';
import { Routes } from '../interfaces/Router/Routes';
import Loader from '../components/Loader/Loader';

const StyledContentContainer = styled.div`
  padding-top: 70px;
`;

const GameRoom = React.lazy(() => import('./GameRoom/GameRoom.container'));
const Home = React.lazy(() => import('./Home/Home.container'));
const Profile = React.lazy(() => import('./Profile/Profile.container'));
const SignIn = React.lazy(() => import('./SignIn/SignIn'));
const SignUp = React.lazy(() => import('./SignUp/SignUp'));
const IndividualGameHistory = React.lazy(() =>
  import('./IndividualMatchHistory/IndividualMatchHistory.container'),
);
const MatchHistory = React.lazy(() =>
  import('./MatchHistory/MatchHistory.container'),
);
const Logout = React.lazy(() => import('./Logout/Logout'));
const NoMatch = React.lazy(() => import('./NoMatch/NoMatch'));

const Pages = () => {
  return (
    <div>
      <Navigation />
      <StyledContentContainer>
        <React.Suspense fallback={<Loader isLoading />}>
          <Switch>
            <Route path={Routes.home} component={Home} exact />
            <ProtectedRoute path={Routes.logout} component={Logout} exact />
            <ProtectedRoute
              path={`${Routes.game}:id`}
              component={GameRoom}
              exact
              shouldBeAuthenticated
            />
            <ProtectedRoute
              path={Routes.profile}
              component={Profile}
              exact
              shouldBeAuthenticated
            />
            <ProtectedRoute
              path={Routes.matchHistory}
              component={MatchHistory}
              exact
              shouldBeAuthenticated
            />
            <ProtectedRoute
              path={`${Routes.individualMatchHistory}:id`}
              component={IndividualGameHistory}
              exact
              shouldBeAuthenticated
            />
            <ProtectedRoute path={Routes.signIn} component={SignIn} exact />
            <ProtectedRoute path={Routes.signUp} component={SignUp} exact />
            <Route component={NoMatch} path="*" />
          </Switch>
        </React.Suspense>
      </StyledContentContainer>
      <Toasts />
    </div>
  );
};

export default Pages;
