import React from 'react';
import { HomeContainerProps } from './Home.container';
import Queue from './Queue';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  margin: 0 auto;
`;

interface Props extends HomeContainerProps {}

const Home: React.FC<Props> = ({
  isAuthenticated,
  joinQueue,
  isInQueue,
  queueCount,
  gameIsPresent,
  gameReconnect,
  isReconnectShown,
}) => {
  return (
    <StyledContainer data-testid="home">
      {isAuthenticated ? (
        <Queue
          queueCount={queueCount}
          joinQueue={joinQueue}
          isInQueue={isInQueue}
          gameIsPresent={gameIsPresent}
          gameReconnect={gameReconnect}
          isReconnectShown={isReconnectShown}
        />
      ) : (
        <span>Log in first.</span>
      )}
    </StyledContainer>
  );
};

export default Home;
