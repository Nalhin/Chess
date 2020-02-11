import React from 'react';
import { PieceType } from '../../../../interfaces/Game/Piece';
import { PlayerColor } from '../../../../interfaces/Game/Player';
import { getPieceUrl } from '../../../../utils/getPieceUrl';
import { useTheme } from '@material-ui/core';
import PieceTooltip from '../../../../components/PieceTooltip/PieceTooltip';
import styled from '@emotion/styled';
import mixins from '../../../../styles/mixins';

const StyledChessImage = styled.img`
  ${props => mixins.getCellSize(props)};
`;

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
