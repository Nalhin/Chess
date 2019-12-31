import React from 'react';
import styled from '@emotion/styled';

const StyledNumbers = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-column-start: 2;
  grid-column-end: 9;
`;

const StyledNumberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 8px;
`;

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];

const Numbers = React.memo(() => {
  return (
    <StyledNumbers>
      {numbers.map(num => (
        <StyledNumberContainer key={num}>{num}</StyledNumberContainer>
      ))}
    </StyledNumbers>
  );
});

export default Numbers;
