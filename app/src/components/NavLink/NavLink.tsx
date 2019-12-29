import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

interface StyledLinkProps {
  isActive: boolean;
}

const StyledLink = styled.a<StyledLinkProps>`
  cursor: pointer;
  background: ${props => props.isActive && 'red'};
`;

interface Props {
  to: string;
}

const NavLink: React.FC<Props> = ({ to, children }) => {
  const history = useHistory();
  const location = useLocation();

  const onClick = () => {
    history.push(to);
  };

  const isActive = location.pathname === to;

  return (
    <StyledLink onClick={onClick} isActive={isActive}>
      {children}
    </StyledLink>
  );
};

export default NavLink;
