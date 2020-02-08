import React from 'react';
import { HomeContainerProps } from './Home.container';
import Queue from './Queue';
import styled from '@emotion/styled';
import { Typography, useTheme } from '@material-ui/core';

const StyledContainer = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const StyledHeader = styled(Typography)`
  padding-top: ${props => props.theme.spacing(3)}px;
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
  const theme = useTheme();
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
        <StyledHeader variant="h4" theme={theme}>
          Log in first.
        </StyledHeader>
      )}
    </StyledContainer>
  );
};

export default Home;
