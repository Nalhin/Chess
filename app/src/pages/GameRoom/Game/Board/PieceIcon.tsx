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
  isDragging: boolean;
}

const StyledChessImage = styled.img<ChessImageProps>`
  ${props => mixins.getCellSize(props)};
  opacity: ${props => props.isDragging && '0'};
`;

interface Props {
  type: PieceType;
  pieceColor: PlayerColor;
  onDragBegin?: () => void;
  className?: string;
  left?: number;
  top?: number;
}

const PieceIcon: React.FC<Props> = ({
  type,
  pieceColor,
  onDragBegin,
  className,
}) => {
  const pieceUrl = getPieceUrl(pieceColor, type);
  const theme = useTheme();
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: DragAndDropTypes.PIECE,
      src: `/assets/images/chess/${pieceUrl}.png`,
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
      src={`/assets/images/chess/${pieceUrl}.png`}
      alt={`${type} ${pieceColor}`}
      className={className}
      isDragging={isDragging}
    />
  );
};

export default PieceIcon;
