import React from 'react';
import { PlayerColor } from '../../../../interfaces/Game/Player';
import { BoardPosition } from '../../../../interfaces/Game/BoardPosition';
import { PieceType } from '../../../../interfaces/Game/Piece';
import { getPieceUrl } from '../../../../utils/getPieceUrl';
import styled from '@emotion/styled';
import { useTheme } from '@material-ui/core';
import PieceTooltip from '../../../../components/PieceTooltip/PieceTooltip';

const StyledImage = styled.img`
  cursor: pointer;
  ${props => props.theme.breakpoints.down('sm')} {
    width: 50px;
    height: 50px;
  }
`;

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
  const theme = useTheme();

  const onClick = () => {
    promotePawn(positionAwaitingPromotion, pieceType);
  };

  return (
    <PieceTooltip pieceType={pieceType}>
      <StyledImage
        onClick={onClick}
        src={getPieceUrl(playerColor, pieceType)}
        alt={`${playerColor} ${pieceType}`}
        theme={theme}
      />
    </PieceTooltip>
  );
};

export default PromotionPiece;
