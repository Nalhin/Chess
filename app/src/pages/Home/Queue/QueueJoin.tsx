import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from '@material-ui/core';
import { StyledQueueButton, StyledQueueContainer } from './QueueShared';
import styled from '@emotion/styled';

const StyledFormControl = styled(FormControl)`
  width: calc(100% - ${props => props.theme.spacing(4)}px);
  margin: ${props => props.theme.spacing(2)}px;
`;

enum GameModes {
  Pvp,
  Ai,
}

interface Props {
  joinQueue: () => void;
  joinQueueAi: () => void;
}

const QueueJoin: React.FC<Props> = ({ joinQueue, joinQueueAi }) => {
  const [selectedMode, setSelectedMode] = React.useState(GameModes.Pvp);
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedMode(event.target.value as GameModes);
  };

  const handleJoinQueue = () => {
    switch (selectedMode) {
      case GameModes.Pvp:
        joinQueue();
        return;
      case GameModes.Ai:
        joinQueueAi();
        return;
      default:
        return;
    }
  };

  return (
    <StyledQueueContainer>
      <StyledFormControl theme={theme}>
        <InputLabel id="select-game-mode">Mode</InputLabel>
        <Select
          labelId="select-game-mode"
          value={selectedMode}
          onChange={handleChange}
        >
          <MenuItem value={GameModes.Pvp}>PVP</MenuItem>
          <MenuItem value={GameModes.Ai}>AI</MenuItem>
        </Select>
      </StyledFormControl>
      <StyledQueueButton
        theme={theme}
        color="primary"
        variant="contained"
        onClick={handleJoinQueue}
      >
        Find match
      </StyledQueueButton>
    </StyledQueueContainer>
  );
};

export default QueueJoin;
