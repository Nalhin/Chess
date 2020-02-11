import React from 'react';
import QueueLoader from '../../../components/Loader/QueueLoader';
import styled from '@emotion/styled';
import { calculateTimeDifferenceInSeconds } from '../../../utils/calculateTimeDifferenceInSeconds';
import mixins from '../../../styles/mixins';
import { Button, useTheme } from '@material-ui/core';
import { QueueContainerProps } from './Queue.container';

const StyledQueue = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
`;

const StyledText = styled.span`
  padding: ${props => props.theme.spacing(3)}px;
`;

const StyledButton = styled(Button)`
  margin: ${props => props.theme.spacing(2)}px;
`;

interface Props extends QueueContainerProps {}

const Queue: React.FC<Props> = ({
  queueCount,
  joinQueue,
  isInQueue,
  isReconnectShown,
  gameReconnect,
  gameIsPresent,
  leaveQueue,
  timeJoined,
  joinQueueAi,
}) => {
  React.useEffect(() => {
    gameIsPresent();
  }, []);

  const [shownTime, setShownTime] = React.useState(null);
  const theme = useTheme();

  React.useEffect(() => {
    if (!timeJoined) {
      return;
    }
    setShownTime(calculateTimeDifferenceInSeconds(timeJoined));
    const timer = setInterval(() => {
      setShownTime(calculateTimeDifferenceInSeconds(timeJoined));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timeJoined]);

  const renderComponent = () => {
    if (isInQueue) {
      return (
        <>
          <StyledButton
            theme={theme}
            color="primary"
            variant="contained"
            onClick={leaveQueue}
          >
            Leave queue
          </StyledButton>
          <StyledText theme={theme}>
            In queue for {shownTime} seconds with {queueCount} other users.
          </StyledText>
          <QueueLoader />
        </>
      );
    }
    if (isReconnectShown) {
      return (
        <StyledButton
          theme={theme}
          color="primary"
          variant="contained"
          onClick={gameReconnect}
        >
          Reconnect
        </StyledButton>
      );
    }
    return (
      <>
        <StyledButton
          theme={theme}
          color="primary"
          variant="contained"
          onClick={joinQueue}
        >
          Play with other players
        </StyledButton>
        <StyledButton
          theme={theme}
          color="primary"
          variant="contained"
          onClick={joinQueueAi}
        >
          Play with AI
        </StyledButton>
      </>
    );
  };

  return <StyledQueue>{renderComponent()}</StyledQueue>;
};

export default Queue;
