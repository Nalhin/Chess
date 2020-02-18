import React from 'react';
import styled from '@emotion/styled';
import mixins from '../../../styles/mixins';
import { QueueContainerProps } from './Queue.container';
import QueueJoin from './QueueJoin';
import QueueStatus from './QueueStatus';
import QueueReconnect from './QueueReconnect';

const StyledQueue = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
`;

interface Props extends QueueContainerProps {}

const Queue: React.FC<Props> = ({
  joinQueue,
  isInQueue,
  isReconnectShown,
  reconnectToGame,
  checkIsGamePresent,
  leaveQueue,
  timeJoined,
  joinQueueAi,
  isUserLoggedIn,
}) => {
  React.useEffect(() => {
    if (isUserLoggedIn) {
      checkIsGamePresent();
    }
  }, [isUserLoggedIn]);

  const renderComponent = () => {
    if (isInQueue) {
      return <QueueStatus timeJoined={timeJoined} leaveQueue={leaveQueue} />;
    }
    if (isReconnectShown) {
      return <QueueReconnect reconnectToGame={reconnectToGame} />;
    }
    return <QueueJoin joinQueue={joinQueue} joinQueueAi={joinQueueAi} />;
  };

  return <StyledQueue data-testid="queue">{renderComponent()}</StyledQueue>;
};

export default Queue;
