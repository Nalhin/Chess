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
}) => {
  return (
    <StyledContainer data-testid="home">
      {isAuthenticated ? (
        <Queue
          queueCount={queueCount}
          joinQueue={joinQueue}
          isInQueue={isInQueue}
        />
      ) : (
        <span>Log in first.</span>
      )}
    </StyledContainer>
  );
};

export default Home;
