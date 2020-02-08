import React from 'react';
import styled from '@emotion/styled';
import { Typography, useTheme } from '@material-ui/core';

const StyledLetters = styled.div`
  display: grid;
`;

const StyledLetterContainer = styled(Typography)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: ${props => props.theme.spacing(2)}px;
`;

const boardNumbers = ['1', '2', '3', '4', '5', '6', '7', '8'].reverse();

const BoardNumbers = React.memo(() => {
  const theme = useTheme();
  return (
    <StyledLetters>
      {boardNumbers.map(number => (
        <StyledLetterContainer variant="body1" key={number} theme={theme}>
          {number}
        </StyledLetterContainer>
      ))}
    </StyledLetters>
  );
});

export default BoardNumbers;
