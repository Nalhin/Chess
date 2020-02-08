import React from 'react';
import styled from '@emotion/styled';
import { PlayerColor } from '../../../../interfaces/Game/Player';
import mixins from '../../../../styles/mixins';
import { Button } from '@material-ui/core';

const StyledContainer = styled.div`
  ${mixins.flexCenter}
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
      <Button color="primary" onClick={forfeitGame}>
        Forfeit
      </Button>
    </StyledContainer>
  );
};

export default ForfeitGame;
