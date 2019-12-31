import React from 'react';

interface Props {
  totalTurnTimeRemaining: number;
}

const Timer: React.FC<Props> = ({ totalTurnTimeRemaining }) => {
  return <div>{totalTurnTimeRemaining}</div>;
};

export default Timer;
