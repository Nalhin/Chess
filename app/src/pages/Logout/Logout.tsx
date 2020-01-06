import React from 'react';
import { Link } from 'react-router-dom';
import { locations } from '../../contants/locations';
import { Card } from '@material-ui/core';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/core';

const StyledCard = styled(Card)`
  max-width: 500px;
  width: 90%;
  margin: ${props => props.theme.space.giga}px auto;
  padding: ${props => props.theme.space.large}px;
`;

const StyledTitle = styled.h2`
  font-weight: ${props => props.theme.fontWeights.heading};
  font-size: ${props => props.theme.fontSizes.larger}px;
  margin-bottom: ${props => props.theme.space.large}px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:visited {
    color: ${props => props.theme.colors.primary};
  }
`;

interface Props {}

const Logout: React.FC<Props> = () => {
  const theme = useTheme();
  return (
    <StyledCard theme={theme}>
      <StyledTitle>You are now signed out.</StyledTitle>
      <span>
        You can{' '}
        <StyledLink to={locations.home} theme={theme}>
          return to the home page
        </StyledLink>{' '}
        or{' '}
        <StyledLink to={locations.signIn} theme={theme}>
          sign in again
        </StyledLink>
        .
      </span>
    </StyledCard>
  );
};

export default Logout;
