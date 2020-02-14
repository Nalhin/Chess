import React from 'react';
import { Typography, useTheme } from '@material-ui/core';
import { StyledQueueButton, StyledQueueContainer } from './QueueShared';

interface Props {
  reconnectToGame: () => void;
}

const QueueReconnect: React.FC<Props> = ({ reconnectToGame }) => {
  const theme = useTheme();
  return (
    <StyledQueueContainer>
      <Typography variant="body1">Game in progress</Typography>
      <StyledQueueButton
        theme={theme}
        color="primary"
        variant="contained"
        onClick={reconnectToGame}
      >
        Reconnect
      </StyledQueueButton>
    </StyledQueueContainer>
  );
};

export default QueueReconnect;
