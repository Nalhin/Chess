import React from 'react';
import { PlayerColor } from '../../../../interfaces/player';
import { PieceType } from '../../../../interfaces/piece';
import { BoardPosition } from '../../../../interfaces/boardPosition';
import PromotionPiece from './PromotionPiece';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledMenu = styled.div`
  background: #444444dd;
`;

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
}

const PromotionMenu: React.FC<Props> = ({
  playerColor,
  positionAwaitingPromotion,
  promotePawn,
}) => {
  return (
    <StyledContainer>
      <StyledMenu>
        {promotionPieces.map(piece => (
          <PromotionPiece
            pieceType={piece}
            playerColor={playerColor}
            positionAwaitingPromotion={positionAwaitingPromotion}
            promotePawn={promotePawn}
          />
        ))}
      </StyledMenu>
    </StyledContainer>
  );
};

export default PromotionMenu;
