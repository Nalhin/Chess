import { isAuthenticatedSelector } from '../../store/user/user.selectors';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import React from 'react';
import { locations } from '../../contants/locations';

interface Props extends RouteProps {
  shouldBeAuthenticated?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  shouldBeAuthenticated,
  ...rest
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === shouldBeAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={locations.home} />
        )
      }
    />
  );
};

ProtectedRoute.defaultProps = {
  shouldBeAuthenticated: false,
  redirectTo: locations.home,
};

export default ProtectedRoute;
