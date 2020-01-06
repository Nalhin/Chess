import React from 'react';
import QueueLoader from '../../components/Loader/QueueLoader';
import Button from '../../components/Button/Button';
import styled from '@emotion/styled';
import { calculateTimeDifferenceInSeconds } from '../../utils/calculateTimeDifferenceInSeconds';

const StyledQueue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledText = styled.span`
  padding: ${props => props.theme.space.large}px;
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
        <Button onClick={gameReconnect}>Reconnect</Button>
      ) : (
        !isInQueue && <Button onClick={joinQueue}>Play</Button>
      )}
      {isInQueue && (
        <>
          <Button onClick={leaveQueue}>Leave queue</Button>
          <StyledText>
            In queue for {shownTime} seconds with {queueCount} other users.
          </StyledText>
          <QueueLoader />
        </>
      )}
    </StyledQueue>
  );
};

export default Queue;
