import { Piece } from '../../../../interfaces/piece';
import React from 'react';
import GraveyardIcon from './GraveyardIcon';

interface GraveyardProps {
  pieces: Piece[];
}

const Graveyard: React.FC<GraveyardProps> = React.memo(({ pieces }) => {
  return (
    <div>
      {pieces.map((piece, i) => (
        <GraveyardIcon
          type={piece.type}
          playerColor={piece.playerColor}
          key={i}
        />
      ))}
    </div>
  );
});

export default Graveyard;
