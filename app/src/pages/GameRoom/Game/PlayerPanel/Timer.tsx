import React from 'react';
import styled from '@emotion/styled';
import { Card, useTheme } from '@material-ui/core';
import dayjs from 'dayjs';

const StyledCard = styled(Card)`
  min-width: ${props => props.theme.spacing(10)}px;
  margin-right: auto;
  user-select: none;
  align-self: flex-end;
  padding: ${props => props.theme.spacing(2)}px;
  font-weight: ${props => props.theme.typography.fontWeightBold};
  font-size: ${props => props.theme.typography.h6.fontSize};
  ${props => props.theme.breakpoints.down('sm')} {
    font-size: ${props => props.theme.typography.body2.fontSize};
    padding: ${props => props.theme.spacing(1)}px;
    min-width: ${props => props.theme.spacing(6)}px;
  }
`;

interface Props {
  totalTurnTimeRemaining: number;
  isActive: boolean;
  turnStartDate: string;
  className?: string;
}

const interval = 100;
const decimalPrecision = 1;

const Timer: React.FC<Props> = ({
  totalTurnTimeRemaining,
  isActive,
  turnStartDate,
  className,
}) => {
  const [counter, setCounter] = React.useState('');
  const theme = useTheme();

  React.useEffect(() => {
    if (totalTurnTimeRemaining) {
      const timeOffset = turnStartDate
        ? dayjs().diff(dayjs(turnStartDate), 'second', true)
        : 0;
      setCounter(
        (totalTurnTimeRemaining - timeOffset).toFixed(decimalPrecision),
      );
    }
  }, [totalTurnTimeRemaining]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout = null;

    if (isActive) {
      timer = setInterval(() => {
        setCounter(prevState => {
          const number = parseFloat(prevState) - 0.1;
          if (number < 0) {
            return '0';
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

  return (
    <StyledCard raised={false} theme={theme} className={className}>
      {counter.replace('.', ':')}
    </StyledCard>
  );
};

export default Timer;
