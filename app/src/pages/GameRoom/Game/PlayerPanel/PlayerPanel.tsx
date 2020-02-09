import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@material-ui/core';
import Timer from './Timer';
import PlayerInfo from './PlayerInfo';

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
  name: string;
  totalTurnTimeRemaining: number;
  isActive: boolean;
}

const PlayerPanel: React.FC<Props> = ({
  name,
  totalTurnTimeRemaining,
  isActive,
}) => {
  const theme = useTheme();
  return (
    <StyledContainer theme={theme}>
      <StyledTimer
        isActive={isActive}
        totalTurnTimeRemaining={totalTurnTimeRemaining}
      />
      <StyledPlayerInfo name={name} />
    </StyledContainer>
  );
};

export default PlayerPanel;
