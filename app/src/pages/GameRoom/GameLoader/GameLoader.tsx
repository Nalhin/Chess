import React from 'react';
import QueueLoader from '../../../components/Loader/QueueLoader';
import styled from '@emotion/styled';
import { Typography, useTheme } from '@material-ui/core';
import mixins from '../../../styles/mixins';

const StyledTitle = styled(Typography)`
  padding: ${props => props.theme.spacing(3)}px;
`;

const StyledContainer = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
`;

interface Props {}

const GameLoader: React.FC<Props> = () => {
  const theme = useTheme();
  return (
    <StyledContainer>
      <StyledTitle variant="h3" theme={theme}>
        Loading game...
      </StyledTitle>
      <QueueLoader />
    </StyledContainer>
  );
};

export default GameLoader;
