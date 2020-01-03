import React from 'react';

interface Props {
  totalTurnTimeRemaining: number;
  isActive: boolean;
}

const interval = 100;
const decimalPrecision = 1;

const Timer: React.FC<Props> = ({ totalTurnTimeRemaining, isActive }) => {
  const [counter, setCounter] = React.useState('');

  React.useEffect(() => {
    totalTurnTimeRemaining &&
      setCounter(totalTurnTimeRemaining.toFixed(decimalPrecision));
  }, [totalTurnTimeRemaining]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout = null;

    if (isActive) {
      timer = setInterval(() => {
        setCounter(prevState =>
          (parseFloat(prevState) - 0.1).toFixed(decimalPrecision),
        );
      }, interval);
    } else {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isActive]);

  return <div>{counter}</div>;
};

export default Timer;
