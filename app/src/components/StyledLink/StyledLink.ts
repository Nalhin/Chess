import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.palette.primary.light};

  &:visited {
    color: ${props => props.theme.palette.primary.light};
  }
`;
