import React from 'react';
import Button from '../../../../components/Button/Button';
import styled from '@emotion/styled';
import { PlayerColor } from '../../../../interfaces/player';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  forfeitGame: () => void;
  userColor: PlayerColor;
  displayedFor: PlayerColor;
}

const ForfeitGame: React.FC<Props> = ({
  forfeitGame,
  userColor,
  displayedFor,
}) => {
  if (userColor !== displayedFor) {
    return null;
  }

  return (
    <StyledContainer>
      <Button onClick={forfeitGame}>Forfeit</Button>
    </StyledContainer>
  );
};

export default ForfeitGame;
