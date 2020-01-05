import React from 'react';
import styled from '@emotion/styled';
import { BoardTextBase } from './BoardNumbers';

const StyledNumbers = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-column-start: 2;
  grid-column-end: 8;
`;

const StyledNumberContainer = styled(BoardTextBase)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: ${props => props.theme.space.medium}px;
`;

const boardLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].reverse();

const BoardLetters = React.memo(() => {
  return (
    <StyledNumbers>
      {boardLetters.map(letter => (
        <StyledNumberContainer key={letter}>{letter}</StyledNumberContainer>
      ))}
    </StyledNumbers>
  );
});

export default BoardLetters;
