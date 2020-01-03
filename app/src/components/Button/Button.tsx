import React from 'react';
import { Button as MaterialButton } from '@material-ui/core';
import { useTheme } from '@emotion/core';
import styled from '@emotion/styled';

const StyledMaterialButton = styled(MaterialButton)`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textLight};
  margin: ${props => props.theme.space.medium}px;
  &:hover {
    background: ${props => props.theme.colors.primaryHover};
  }
`;

interface Props {
  onClick: () => void;
}

const Button: React.FC<Props> = ({ children, onClick }) => {
  const theme = useTheme();

  return (
    <StyledMaterialButton theme={theme} onClick={onClick} variant="contained">
      {children}
    </StyledMaterialButton>
  );
};

export default Button;
