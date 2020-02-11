import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@material-ui/core';
import Timer from './Timer';
import PlayerInfo from './PlayerInfo';
import { Player } from '../../../../interfaces/Game/Player';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${props => props.theme.spacing(2)}px 0;
`;

const StyledTimer = styled(Timer)`
  align-self: flex-end;
`;

const StyledPlayerInfo = styled(PlayerInfo)`
  align-self: flex-start;
`;

interface Props {
  player: Player;
  isActive: boolean;
}

const PlayerPanel: React.FC<Props> = ({ player, isActive }) => {
  const theme = useTheme();
  return (
    <StyledContainer theme={theme}>
      <StyledTimer
        isActive={isActive}
        totalTurnTimeRemaining={player.totalTurnTimeRemaining}
        turnStartDate={player.turnStartDate}
      />
      <StyledPlayerInfo name={player.name} />
    </StyledContainer>
  );
};

export default PlayerPanel;
