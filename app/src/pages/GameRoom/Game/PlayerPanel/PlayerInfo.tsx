import React from 'react';
import { Card, useTheme } from '@material-ui/core';
import PlayerAvatar from '../../../../components/PlayerAvatar/PlayerAvatar';
import styled from '@emotion/styled';

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 ${props => props.theme.spacing(1)}px;
  min-width: ${props => props.theme.spacing(10)}px;
  ${props => props.theme.breakpoints.down('sm')} {
    min-width: ${props => props.theme.spacing(6)}px;
  }
`;

const StyledPlayerAvatar = styled(PlayerAvatar)`
  margin-left: auto;
  width: ${props => props.theme.spacing(5)}px;
  height: ${props => props.theme.spacing(5)}px;
  ${props => props.theme.breakpoints.down('sm')} {
    width: ${props => props.theme.spacing(3)}px;
    height: ${props => props.theme.spacing(3)}px;
  }
`;

const StyledName = styled.div`
  padding-right: ${props => props.theme.spacing(1)}px;
`;

interface Props {
  name: string;
}

const PlayerInfo: React.FC<Props> = ({ name }) => {
  const theme = useTheme();
  return (
    <StyledCard theme={theme}>
      <StyledName theme={theme}>{name}</StyledName>
      <StyledPlayerAvatar
        name={name}
        isThumbnail
        variant="square"
        theme={theme}
      />
    </StyledCard>
  );
};

export default PlayerInfo;
