import React from 'react';
import { Link } from 'react-router-dom';
import { locations } from '../../contants/locations';
import { Card } from '@material-ui/core';

interface Props {}

const Logout: React.FC<Props> = () => {
  return (
    <Card>
      <h2>You are now sign out.</h2>
      <span>
        You can <Link to={locations.home}>return to the home page</Link> or
        <Link to={locations.signIn}>sign in again.</Link>
      </span>
    </Card>
  );
};

export default Logout;
