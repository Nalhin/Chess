import React from 'react';
import styled from '@emotion/styled';
import { Typography, useTheme } from '@material-ui/core';
import mixins from '../../../../styles/mixins';

const StyledNumbers = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-column-start: 2;
  grid-column-end: 8;
`;

const StyledNumberContainer = styled(Typography)`
  ${mixins.flexCenter};
  padding-top: ${props => props.theme.spacing(2)}px;
`;

const boardLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].reverse();

const BoardLetters = React.memo(() => {
  const theme = useTheme();

  return (
    <StyledNumbers>
      {boardLetters.map(letter => (
        <StyledNumberContainer variant="body1" key={letter} theme={theme}>
          {letter}
        </StyledNumberContainer>
      ))}
    </StyledNumbers>
  );
});

export default BoardLetters;
