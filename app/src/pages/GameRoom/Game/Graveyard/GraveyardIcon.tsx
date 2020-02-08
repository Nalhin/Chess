import React from 'react';
import { PieceType } from '../../../../interfaces/Game/Piece';
import { PlayerColor } from '../../../../interfaces/Game/Player';
import { getPieceUrl } from '../../../../utils/getPieceUrl';
import { StyledChessImage } from '../Board/PieceIcon';

interface Props {
  type: PieceType;
  playerColor: PlayerColor;
}

const GraveyardIcon: React.FC<Props> = ({ type, playerColor }) => {
  const pieceUrl = getPieceUrl(playerColor, type);

  return (
    <StyledChessImage
      src={`/assets/images/chess/${pieceUrl}.png`}
      alt={`${type} ${playerColor}`}
    />
  );
};

export default GraveyardIcon;
