import React from 'react';
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from '@material-ui/core';
import { StyledQueueButton, StyledQueueContainer } from './QueueShared';
import styled from '@emotion/styled';
import mixins from '../../../styles/mixins';
import { GameModes } from '../../../interfaces/Queue/GameModes';

const StyledFormControl = styled(FormControl)`
  width: calc(100% - ${props => props.theme.spacing(4)}px);
  margin: ${props => props.theme.spacing(2)}px;
`;

const StyledButtonContainer = styled.div`
  position: relative;
`;

const StyledLoaderWrapper = styled.div`
  ${mixins.absoluteCenter};
  ${mixins.flexCenter};
`;

interface Props {
  joinQueue: () => void;
  joinQueueAi: () => void;
}

const QueueJoin: React.FC<Props> = ({ joinQueue, joinQueueAi }) => {
  const [selectedMode, setSelectedMode] = React.useState(GameModes.Pvp);
  const [isClicked, setClicked] = React.useState(false);
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedMode(event.target.value as GameModes);
  };

  const handleJoinQueue = () => {
    setClicked(true);
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
    <StyledQueueContainer data-testid="queue__join">
      <StyledFormControl theme={theme}>
        <InputLabel htmlFor="select-game-mode">Mode</InputLabel>
        <Select
          id="select-game-mode"
          value={selectedMode}
          onChange={handleChange}
        >
          <MenuItem value={GameModes.Pvp}>PVP</MenuItem>
          <MenuItem value={GameModes.Ai}>AI</MenuItem>
        </Select>
      </StyledFormControl>
      <StyledButtonContainer>
        <StyledQueueButton
          theme={theme}
          color="primary"
          variant="contained"
          disabled={isClicked}
          onClick={handleJoinQueue}
        >
          Find match
        </StyledQueueButton>
        {isClicked && (
          <StyledLoaderWrapper>
            <CircularProgress size={24} />
          </StyledLoaderWrapper>
        )}
      </StyledButtonContainer>
    </StyledQueueContainer>
  );
};

export default QueueJoin;
