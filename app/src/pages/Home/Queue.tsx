import React from 'react';
import QueueLoader from '../../components/Loader/QueueLoader';
import Button from '../../components/Button/Button';

interface Props {
  joinQueue: () => void;
  queueCount: number;
  isInQueue: boolean;
  gameReconnect: () => void;
  gameIsPresent: () => void;
  isReconnectShown: boolean;
}

const Queue: React.FC<Props> = ({
  queueCount,
  joinQueue,
  isInQueue,
  isReconnectShown,
  gameReconnect,
  gameIsPresent,
}) => {
  React.useEffect(() => {
    gameIsPresent();
  }, []);

  return (
    <div>
      {isReconnectShown ? (
        <Button onClick={gameReconnect}>Reconnect</Button>
      ) : (
        <Button onClick={joinQueue}>Play</Button>
      )}
      {isInQueue && <QueueLoader />}
    </div>
  );
};

export default Queue;
