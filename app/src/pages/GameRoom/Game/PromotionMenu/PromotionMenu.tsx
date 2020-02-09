import React from 'react';
import { PlayerColor } from '../../../../interfaces/Game/Player';
import { PieceType } from '../../../../interfaces/Game/Piece';
import { BoardPosition } from '../../../../interfaces/Game/BoardPosition';
import PromotionPiece from './PromotionPiece';
import GameMenu from '../GameMenu/GameMenu';

const promotionPieces = [
  PieceType.KNIGHT,
  PieceType.BISHOP,
  PieceType.ROOK,
  PieceType.QUEEN,
];

interface Props {
  playerColor: PlayerColor;
  positionAwaitingPromotion: BoardPosition;
  promotePawn: (position: BoardPosition, pieceType: PieceType) => void;
  isShown: boolean;
}

const PromotionMenu: React.FC<Props> = ({
  playerColor,
  positionAwaitingPromotion,
  promotePawn,
  isShown,
}) => {
  return (
    <GameMenu isShown={isShown} header={'Promote piece!'}>
      {promotionPieces.map(piece => (
        <PromotionPiece
          key={piece}
          pieceType={piece}
          playerColor={playerColor}
          positionAwaitingPromotion={positionAwaitingPromotion}
          promotePawn={promotePawn}
        />
      ))}
    </GameMenu>
  );
};

export default PromotionMenu;
