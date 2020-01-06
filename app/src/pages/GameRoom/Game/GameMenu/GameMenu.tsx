import React from 'react';
import styled from '@emotion/styled';
import { Card } from '@material-ui/core';
import { useTheme } from '@emotion/core';

const StyledContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #444444dd;
`;

const StyledMenu = styled(Card)`
  padding: ${props => props.theme.space.medium}px;
`;

interface Props {
  isShown: boolean;
}

const GameMenu: React.FC<Props> = ({ isShown, children }) => {
  const theme = useTheme();
  if (!isShown) {
    return null;
  }

  return (
    <StyledContainer>
      <StyledMenu theme={theme}>{children}</StyledMenu>
    </StyledContainer>
  );
};

export default GameMenu;
