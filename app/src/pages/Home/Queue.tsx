import React from 'react';
import QueueLoader from '../../components/Loader/QueueLoader';
import Button from '../../components/Button/Button';

interface Props {
  joinQueue: () => void;
  queueCount: number;
  isInQueue: boolean;
}

const Queue: React.FC<Props> = ({ queueCount, joinQueue, isInQueue }) => {
  return (
    <div>
      <Button onClick={joinQueue}>Play</Button>
      {isInQueue && <QueueLoader />}
    </div>
  );
};

export default Queue;
