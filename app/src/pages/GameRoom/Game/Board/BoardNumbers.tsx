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

const boardNumbers = ['1', '2', '3', '4', '5', '6', '7', '8'].reverse();

const BoardNumbers = React.memo(() => {
  return (
    <StyledLetters>
      {boardNumbers.map(number => (
        <StyledLetterContainer key={number}>{number}</StyledLetterContainer>
      ))}
    </StyledLetters>
  );
});

export default BoardNumbers;
