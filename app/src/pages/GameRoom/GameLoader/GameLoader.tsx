import React from 'react';
import QueueLoader from '../../../components/Loader/QueueLoader';
import styled from '@emotion/styled';

const StyledTitle = styled.h2`
  font-weight: ${props => props.theme.fontWeights.heading};
  font-size: ${props => props.theme.fontSizes.larger}px;
  padding: ${props => props.theme.space.large}px;
`;

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

interface Props {}

const GameLoader: React.FC<Props> = () => {
  return (
    <StyledContainer>
      <StyledTitle>Loading game...</StyledTitle>
      <QueueLoader />
    </StyledContainer>
  );
};

export default GameLoader;
