import React from 'react';
import NavLink from '../../components/NavLink/NavLink';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticatedSelector } from '../../store/user/user.selectors';
import { logoutUser } from '../../store/user/user.actions';

const Navigation = () => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav>
      <NavLink to="/">Play</NavLink>
      {isAuthenticated ? (
        <>
          <NavLink to="/profile">Profile</NavLink>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigation;
