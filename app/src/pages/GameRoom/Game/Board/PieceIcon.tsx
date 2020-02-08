import React from 'react';
import { PieceType } from '../../../../interfaces/Game/Piece';
import { PlayerColor } from '../../../../interfaces/Game/Player';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { DragAndDropTypes } from '../../../../contants/dragAndDropTypes';
import { getPieceUrl } from '../../../../utils/getPieceUrl';
import { cellSize } from '../../../../styles/cellSize';
import styled from '@emotion/styled';
import { useTheme } from '@material-ui/core';

export const StyledChessImage = styled.img`
  width: ${cellSize.desktop};
  height: ${cellSize.desktop};

  ${props => props.theme.breakpoints.down('md')} {
    width: ${cellSize.tablet};
    height: ${cellSize.tablet};
  }

  ${props => props.theme.breakpoints.down('sm')} {
    width: ${cellSize.mobile};
    height: ${cellSize.mobile};
  }
`;

const StyledDragPreviewImage = StyledChessImage.withComponent(DragPreviewImage);

interface Props {
  type: PieceType;
  pieceColor: PlayerColor;
  onDragBegin?: () => void;
}

const PieceIcon: React.FC<Props> = ({ type, pieceColor, onDragBegin }) => {
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
      />
    </>
  );
};

export default PieceIcon;
