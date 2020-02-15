import React from 'react';
import { Routes } from '../../interfaces/Router/Routes';
import { Card, Typography, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { StyledLink } from '../../components/StyledLink/StyledLink';

const StyledCard = styled(Card)`
  max-width: 500px;
  width: 90%;
  margin: ${props => props.theme.spacing(4)}px auto;
  padding: ${props => props.theme.spacing(3)}px;
`;

const StyledTitle = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing(3)}px;
`;

interface Props {}

const Logout: React.FC<Props> = () => {
  const theme = useTheme();
  return (
    <StyledCard theme={theme}>
      <StyledTitle variant="h4" theme={theme}>
        You are now signed out.
      </StyledTitle>
      <span>
        You can{' '}
        <StyledLink to={Routes.home} theme={theme}>
          return to the home page
        </StyledLink>{' '}
        or{' '}
        <StyledLink to={Routes.login} theme={theme}>
          sign in again
        </StyledLink>
        .
      </span>
    </StyledCard>
  );
};

export default Logout;
