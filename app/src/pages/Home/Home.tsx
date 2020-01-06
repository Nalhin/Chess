import React from 'react';
import { HomeContainerProps } from './Home.container';
import Queue from './Queue';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const StyledHeader = styled.h1`
  padding-top: ${props => props.theme.space.large}px;
  font-size: ${props => props.theme.fontSizes.larger}px;
  font-weight: ${props => props.theme.fontWeights.heading}px;
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
  leaveQueue,
  timeJoined,
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
          leaveQueue={leaveQueue}
          timeJoined={timeJoined}
        />
      ) : (
        <StyledHeader>Log in first.</StyledHeader>
      )}
    </StyledContainer>
  );
};

export default Home;
