import React from 'react';
import QueueLoader from '../../components/Loader/QueueLoader';
import styled from '@emotion/styled';
import { calculateTimeDifferenceInSeconds } from '../../utils/calculateTimeDifferenceInSeconds';
import mixins from '../../styles/mixins';
import { Button, useTheme } from '@material-ui/core';

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

interface Props {
  joinQueue: () => void;
  queueCount: number;
  isInQueue: boolean;
  gameReconnect: () => void;
  gameIsPresent: () => void;
  leaveQueue: () => void;
  isReconnectShown: boolean;
  timeJoined: string;
}

const Queue: React.FC<Props> = ({
  queueCount,
  joinQueue,
  isInQueue,
  isReconnectShown,
  gameReconnect,
  gameIsPresent,
  leaveQueue,
  timeJoined,
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

  return (
    <StyledQueue>
      {isReconnectShown ? (
        <StyledButton
          theme={theme}
          color="primary"
          variant="contained"
          onClick={gameReconnect}
        >
          Reconnect
        </StyledButton>
      ) : (
        !isInQueue && (
          <StyledButton
            theme={theme}
            color="primary"
            variant="contained"
            onClick={joinQueue}
          >
            Play
          </StyledButton>
        )
      )}
      {isInQueue && (
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
      )}
    </StyledQueue>
  );
};

export default Queue;
