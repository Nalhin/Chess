import { isAuthenticatedSelector } from '../../store/user/user.selectors';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import React from 'react';

interface Props extends RouteProps {
  withAuthentication?: boolean;
}

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  withAuthentication,
  ...rest
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated === withAuthentication ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

ProtectedRoute.defaultProps = {
  withAuthentication: false,
};

export default ProtectedRoute;
