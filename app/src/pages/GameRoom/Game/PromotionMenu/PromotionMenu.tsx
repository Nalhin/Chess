import React from 'react';
import { PlayerColor } from '../../../../interfaces/player';
import { PieceType } from '../../../../interfaces/piece';
import { BoardPosition } from '../../../../interfaces/boardPosition';
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
    <GameMenu isShown={isShown}>
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
