import React from 'react';
import { HomeContainerProps } from './Home.container';
import { useHistory } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

interface Props extends HomeContainerProps {}

const Home: React.FC<Props> = ({
  gameId,
  isAuthenticated,
  joinQueue,
  isInQueue,
  queueCount,
}) => {
  const history = useHistory();

  React.useEffect(() => {
    if (gameId && isAuthenticated) {
      history.push(`/game/${gameId}`);
    }
  }, [gameId, isAuthenticated]);
  return (
    <div data-testid="home">
      <Loader isLoading={isInQueue}>
        {isAuthenticated ? (
          <>
            <button onClick={joinQueue}>Play</button>
            {isInQueue && <span>In queue with: {queueCount} users</span>}
          </>
        ) : (
          <span>Log in first.</span>
        )}
      </Loader>
    </div>
  );
};

export default Home;
