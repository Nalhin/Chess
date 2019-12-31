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

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].reverse();

const Letters = React.memo(() => {
  return (
    <StyledLetters>
      {letters.map(letter => (
        <StyledLetterContainer key={letter}>{letter}</StyledLetterContainer>
      ))}
    </StyledLetters>
  );
});

export default Letters;
