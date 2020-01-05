import React from 'react';
import PlayerAvatar from '../PlayerAvatar/PlayerAvatar';
import Crown from './Crown';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/core';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: ${props => props.theme.space.large}px;
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

const StyledName = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${props => props.theme.space.medium}px 0;
  font-weight: ${props => props.theme.fontWeights.heading};
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
        <StyledName>{name}</StyledName>
      </StyledAvatarContainer>
    </StyledContainer>
  );
};

export default MatchHistoryPlayer;
