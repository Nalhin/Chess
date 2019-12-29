import React from 'react';
import { HomeContainerProps } from './Home.container';
import { useHistory } from 'react-router-dom';

interface Props extends HomeContainerProps {}

const Home: React.FC<Props> = ({ gameId, isAuthenticated, joinGameQueue }) => {
  const history = useHistory();

  React.useEffect(() => {
    if (gameId && isAuthenticated) {
      history.push(`/game/${gameId}`);
    }
  }, [gameId, isAuthenticated]);
  return (
    <div>
      {isAuthenticated ? (
        <button onClick={joinGameQueue}>Play</button>
      ) : (
        <span>Log in first.</span>
      )}
    </div>
  );
};

export default Home;
