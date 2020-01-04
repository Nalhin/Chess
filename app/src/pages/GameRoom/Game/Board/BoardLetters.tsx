import React from 'react';
import styled from '@emotion/styled';

export const BoardTextBase = styled.div`
  font-size: ${props => props.theme.fontSizes.larger}px;
  font-weight: ${props => props.theme.fontWeights.heading};

  ${props => props.theme.mediaQueries.small} {
    font-size: ${props => props.theme.fontSizes.body}px;
  }
`;

const StyledLetters = styled.div`
  display: grid;
`;

const StyledLetterContainer = styled(BoardTextBase)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: ${props => props.theme.space.large}px;
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
