import React from 'react';
import { PieceType } from '../../../../interfaces/Game/Piece';
import { PlayerColor } from '../../../../interfaces/Game/Player';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { DragAndDropTypes } from '../../../../interfaces/DragAndDrop/dragAndDropTypes';
import { getPieceUrl } from '../../../../utils/getPieceUrl';
import styled from '@emotion/styled';
import { useTheme } from '@material-ui/core';
import mixins from '../../../../styles/mixins';
import { getEmptyImage } from 'react-dnd-html5-backend';

interface ChessImageProps {
  isDragging?: boolean;
}

export const StyledChessImage = styled.img<ChessImageProps>`
  ${props => mixins.getCellSize(props)};
  opacity: ${props => props.isDragging && '0'};
  position: absolute;
`;

interface Props {
  type: PieceType;
  pieceColor: PlayerColor;
  onDragBegin?: () => void;
  className?: string;
  left?: number;
  top?: number;
}

const PieceIcon: React.FC<Props> = ({ type, pieceColor, onDragBegin }) => {
  const pieceUrl = getPieceUrl(pieceColor, type);
  const theme = useTheme();
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: DragAndDropTypes.PIECE,
      src: pieceUrl,
    },
    begin: () => onDragBegin(),
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  React.useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <StyledChessImage
      ref={drag}
      theme={theme}
      src={pieceUrl}
      alt={`${pieceColor} ${type}`}
      isDragging={isDragging}
    />
  );
};

export default PieceIcon;
