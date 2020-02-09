import React from 'react';
import { PieceType } from '../../../../interfaces/Game/Piece';
import { PlayerColor } from '../../../../interfaces/Game/Player';
import { getPieceUrl } from '../../../../utils/getPieceUrl';
import { StyledChessImage } from '../Board/PieceIcon';
import { useTheme } from '@material-ui/core';
import PieceTooltip from '../../../../components/PieceTooltip/PieceTooltip';

interface Props {
  type: PieceType;
  playerColor: PlayerColor;
}

const GraveyardIcon: React.FC<Props> = ({ type, playerColor }) => {
  const theme = useTheme();
  const pieceUrl = getPieceUrl(playerColor, type);

  return (
    <PieceTooltip pieceType={type}>
      <StyledChessImage
        src={`/assets/images/chess/${pieceUrl}.png`}
        alt={`${type} ${playerColor}`}
        theme={theme}
      />
    </PieceTooltip>
  );
};

export default GraveyardIcon;
