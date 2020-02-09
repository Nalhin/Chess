import { Piece } from '../../../../interfaces/Game/Piece';
import React from 'react';
import GraveyardIcon from './GraveyardIcon';
import styled from '@emotion/styled';
import mixins from '../../../../styles/mixins';
import { Typography, useTheme } from '@material-ui/core';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;
const StyledDiv = styled.div`
  ${props => mixins.getCellSize(props)}
`;

interface GraveyardProps {
  pieces: Piece[];
  description: string;
  className?: string;
}

const Graveyard: React.FC<GraveyardProps> = React.memo(
  ({ pieces, description, className }) => {
    const theme = useTheme();
    return (
      <StyledContainer className={className}>
        <Typography variant="body2">{description}</Typography>
        <StyledListWrapper>
          {pieces.length ? (
            pieces.map((piece, i) => (
              <GraveyardIcon
                type={piece.type}
                playerColor={piece.playerColor}
                key={i}
              />
            ))
          ) : (
            <StyledDiv theme={theme} />
          )}
        </StyledListWrapper>
      </StyledContainer>
    );
  },
);

export default Graveyard;
