import React from 'react';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  margin: 0 auto;
  text-align: center;
  user-select: none;
  font-size: ${props => props.theme.fontSizes.larger}px;

  ${props => props.theme.mediaQueries.small} {
    font-size: ${props => props.theme.fontSizes.body}px;
  }
`;

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
        setCounter(prevState => {
          const number = parseFloat(prevState) - 0.1;
          if (number < 0) {
            return 'Out of Time!';
          }
          return number.toFixed(decimalPrecision);
        });
      }, interval);
    } else {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isActive]);

  return <StyledContainer>{counter}</StyledContainer>;
};

export default Timer;
