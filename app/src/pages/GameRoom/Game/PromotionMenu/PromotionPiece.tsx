import React from 'react';
import { PlayerColor } from '../../../../interfaces/Game/Player';
import { BoardPosition } from '../../../../interfaces/Game/BoardPosition';
import { PieceType } from '../../../../interfaces/Game/Piece';
import { getPieceUrl } from '../../../../utils/getPieceUrl';

interface Props {
  playerColor: PlayerColor;
  pieceType: PieceType;
  positionAwaitingPromotion: BoardPosition;
  promotePawn: (position: BoardPosition, pieceType: PieceType) => void;
}

const PromotionPiece: React.FC<Props> = ({
  playerColor,
  pieceType,
  positionAwaitingPromotion,
  promotePawn,
}) => {
  const onClick = () => {
    promotePawn(positionAwaitingPromotion, pieceType);
  };

  return (
    <img
      onClick={onClick}
      src={`/assets/images/chess/${getPieceUrl(playerColor, pieceType)}.png`}
      alt={`${playerColor} ${pieceType}`}
    />
  );
};

export default PromotionPiece;
