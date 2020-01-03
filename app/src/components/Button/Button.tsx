import React from 'react';
import { Button as MaterialButton } from '@material-ui/core';
import { useTheme } from '@emotion/core';
import styled from '@emotion/styled';

export const StyledMaterialButton = styled(MaterialButton)`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textLight};
  margin: ${props => props.theme.space.medium}px;
  &:hover {
    background: ${props => props.theme.colors.primaryHover};
  }
`;

interface Props {
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ children, onClick, disabled }) => {
  const theme = useTheme();

  return (
    <StyledMaterialButton
      variant="contained"
      theme={theme}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledMaterialButton>
  );
};

export default Button;
