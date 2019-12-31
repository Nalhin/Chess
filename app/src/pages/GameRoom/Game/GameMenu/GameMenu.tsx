import React from 'react';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledMenu = styled.div`
  background: #444444dd;
`;

interface Props {
  isShown: boolean;
}

const GameMenu: React.FC<Props> = ({ isShown, children }) => {
  if (!isShown) {
    return null;
  }

  return (
    <StyledContainer>
      <StyledMenu>{children}</StyledMenu>
    </StyledContainer>
  );
};

export default GameMenu;
