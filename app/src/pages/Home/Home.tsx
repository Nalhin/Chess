import React from 'react';
import { HomeContainerProps } from './Home.container';
import Queue from './Queue';
import styled from '@emotion/styled';
import { Typography, useTheme } from '@material-ui/core';
import { joinQueueAi } from '../../store/queue/queue.actions';

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
  joinQueueAi,
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
          joinQueueAi={joinQueueAi}
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
