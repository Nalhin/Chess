import React from 'react';
import styled from '@emotion/styled';

const StyledLetters = styled.div`
  display: grid;
`;

const StyledLetterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 8px;
`;

const boardLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].reverse();

const BoardLetters = React.memo(() => {
  return (
    <StyledLetters>
      {boardLetters.map(letter => (
        <StyledLetterContainer key={letter}>{letter}</StyledLetterContainer>
      ))}
    </StyledLetters>
  );
});

export default BoardLetters;
