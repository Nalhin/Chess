import React from 'react';
import {
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from '@material-ui/core';
import { calculateTimeDifferenceInSeconds } from '../../../utils/calculateTimeDifferenceInSeconds';
import styled from '@emotion/styled';
import mixins from '../../../styles/mixins';

const StyledButton = styled(Button)`
  margin: ${props => props.theme.spacing(2)}px;
`;

const StyledContainer = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing(2)}px;
`;

interface Props {
  timeJoined: string;
  leaveQueue: () => void;
}

const QueueStatus: React.FC<Props> = ({ timeJoined, leaveQueue }) => {
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
    <StyledContainer>
      <StyledTypography variant="body1" theme={theme}>
        In queue for {shownTime} seconds.
      </StyledTypography>
      <CircularProgress />
      <StyledButton
        theme={theme}
        color="primary"
        variant="contained"
        onClick={leaveQueue}
      >
        Leave queue
      </StyledButton>
    </StyledContainer>
  );
};

export default QueueStatus;
