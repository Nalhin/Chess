import React from 'react';
import { useTheme } from '@material-ui/core';
import { StyledPageTitle } from '../../components/StyledPageTitle/StyledPageTitle';

interface Props {}

const NoMatch: React.FC<Props> = () => {
  const theme = useTheme();
  return (
    <StyledPageTitle variant="h5" theme={theme}>
      No match for a given route
    </StyledPageTitle>
  );
};

export default NoMatch;
