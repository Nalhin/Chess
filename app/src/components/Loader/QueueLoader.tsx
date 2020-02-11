import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import styled from '@emotion/styled';
import { useTheme } from '@material-ui/core';

const StyledContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing(5)}px;
`;

interface Props {}

const QueueLoader: React.FC<Props> = () => {
  const theme = useTheme();
  return (
    <StyledContainer theme={theme}>
      <PacmanLoader loading color={'#f2d648'} size={40} />
    </StyledContainer>
  );
};

export default QueueLoader;
