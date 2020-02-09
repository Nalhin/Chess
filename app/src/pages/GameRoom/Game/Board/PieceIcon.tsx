import React from 'react';
import { PieceType } from '../../../../interfaces/Game/Piece';
import { PlayerColor } from '../../../../interfaces/Game/Player';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { DragAndDropTypes } from '../../../../contants/dragAndDropTypes';
import { getPieceUrl } from '../../../../utils/getPieceUrl';
import styled from '@emotion/styled';
import { useTheme } from '@material-ui/core';
import mixins from '../../../../styles/mixins';

export const StyledChessImage = styled.img`
  ${props => mixins.getCellSize(props)};
`;

const StyledDragPreviewImage = StyledChessImage.withComponent(DragPreviewImage);

interface Props {
  type: PieceType;
  pieceColor: PlayerColor;
  onDragBegin?: () => void;
  className?: string;
}

const PieceIcon: React.FC<Props> = ({
  type,
  pieceColor,
  onDragBegin,
  className,
}) => {
  const pieceUrl = getPieceUrl(pieceColor, type);
  const theme = useTheme();
  const [{}, drag, preview] = useDrag({
    item: { type: DragAndDropTypes.PIECE },
    begin: () => onDragBegin(),
  });

  return (
    <>
      <StyledDragPreviewImage
        theme={theme}
        src={`/assets/images/chess/${pieceUrl}.png`}
        connect={preview}
      />

      <StyledChessImage
        ref={drag}
        theme={theme}
        src={`/assets/images/chess/${pieceUrl}.png`}
        alt={`${type} ${pieceColor}`}
        className={className}
      />
    </>
  );
};

export default PieceIcon;
