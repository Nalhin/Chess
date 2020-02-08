import React from 'react';
import styled from '@emotion/styled';
import { Card, useTheme } from '@material-ui/core';
import mixins from '../../../../styles/mixins';

const StyledContainer = styled.div`
  ${mixins.absoluteCenter}
  ${mixins.flexCenter};
  ${props => props.theme.palette.grey['200']};
`;

const StyledMenu = styled(Card)`
  padding: ${props => props.theme.spacing(2)}px;
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
    <StyledContainer theme={theme}>
      <StyledMenu theme={theme}>{children}</StyledMenu>
    </StyledContainer>
  );
};

export default GameMenu;
