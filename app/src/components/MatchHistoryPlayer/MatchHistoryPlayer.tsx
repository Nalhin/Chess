import React from 'react';
import PlayerAvatar from '../PlayerAvatar/PlayerAvatar';
import Crown from './Crown';
import styled from '@emotion/styled';
import { Typography, useTheme } from '@material-ui/core';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: ${props => props.theme.spacing(3)}px;
`;

const StyledCrown = styled(Crown)`
  position: absolute;
  top: -36px;
  left: 7px;
  z-index: 1000;
  width: 50px;
  height: 50px;
`;

const StyledPlayerAvatar = styled(PlayerAvatar)`
  width: 60px;
  height: 60px;
`;

const StyledAvatarContainer = styled.div`
  position: relative;
`;

interface Props {
  name: string;
  isWinner: boolean;
  className?: string;
}

const MatchHistoryPlayer: React.FC<Props> = ({ name, isWinner, className }) => {
  const theme = useTheme();
  return (
    <StyledContainer className={className} theme={theme}>
      <StyledAvatarContainer theme={theme}>
        {isWinner && <StyledCrown />}
        <StyledPlayerAvatar name={name} />
        <Typography variant="body1">{name}</Typography>
      </StyledAvatarContainer>
    </StyledContainer>
  );
};

export default MatchHistoryPlayer;
