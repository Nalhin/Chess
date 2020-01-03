import React from 'react';
import { HomeContainerProps } from './Home.container';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';

interface Props extends HomeContainerProps {}

const Home: React.FC<Props> = ({
  isAuthenticated,
  joinQueue,
  isInQueue,
  queueCount,
}) => {
  return (
    <div data-testid="home">
      <Loader isLoading={isInQueue}>
        {isAuthenticated ? (
          <>
            <Button onClick={joinQueue}>Play</Button>
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
