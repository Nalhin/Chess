import { Piece } from '../../../interfaces/piece';
import React from 'react';
import PieceIcon from './PieceIcon';

interface GraveyardProps {
  pieces: Piece[];
}

const Graveyard: React.FC<GraveyardProps> = ({ pieces }) => {
  return (
    <div>
      {pieces.map((piece, i) => (
        <PieceIcon type={piece.type} playerColor={piece.playerColor} key={i} />
      ))}
    </div>
  );
};

export default Graveyard;
