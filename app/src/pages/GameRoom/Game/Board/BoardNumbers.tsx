import React from 'react';
import styled from '@emotion/styled';
import { BoardTextBase } from './BoardLetters';

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

const boardNumbers = ['1', '2', '3', '4', '5', '6', '7', '8'];

const BoardNumbers = React.memo(() => {
  return (
    <StyledNumbers>
      {boardNumbers.map(num => (
        <StyledNumberContainer key={num}>{num}</StyledNumberContainer>
      ))}
    </StyledNumbers>
  );
});

export default BoardNumbers;
