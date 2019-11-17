import * as React from 'react';
import { Piece } from '../../../inferfaces/piece';
import { PlayerColor } from '../../../inferfaces/player';
import styled from '@emotion/styled';

interface StyledPieceProps {
  playerColor: PlayerColor;
}

const StyledPiece = styled.div`
  color: ${(props: StyledPieceProps) => {
    switch (props.playerColor) {
      case PlayerColor.BLACK:
        return 'black';
      case PlayerColor.WHITE:
        return 'white';
    }
  }};
`;

interface GraveyardProps {
  pieces: Piece[];
}

const Graveyard: React.FC<GraveyardProps> = ({ pieces }) => {
  return (
    <div>
      {pieces.map((piece, i) => (
        <StyledPiece playerColor={piece.playerColor} key={i}>
          {piece.type}
        </StyledPiece>
      ))}
    </div>
  );
};

export default Graveyard;
