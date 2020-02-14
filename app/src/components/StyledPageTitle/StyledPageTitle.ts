import styled from '@emotion/styled';
import { Typography } from '@material-ui/core';

export const StyledPageTitle = styled(Typography)`
  text-align: center;
  padding: ${props => props.theme.spacing(3)}px 0;
  ${props => props.theme.breakpoints.down('sm')} {
    padding: ${props => props.theme.spacing(2)}px 0;
  }
`;
