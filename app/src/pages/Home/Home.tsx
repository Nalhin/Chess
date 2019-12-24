import React from 'react';
import { HomeContainerProps } from './Home.container';
import { useHistory } from 'react-router-dom';

interface Props extends HomeContainerProps {}

const Home: React.FC<Props> = ({ gameId, joinGameQueue }) => {
  const history = useHistory();

  React.useEffect(() => {
    if (gameId) {
      history.push(`/game/${gameId}`);
    }
  }, [gameId]);
  return (
    <div>
      <button onClick={joinGameQueue}>Play</button>
    </div>
  );
};

export default Home;
