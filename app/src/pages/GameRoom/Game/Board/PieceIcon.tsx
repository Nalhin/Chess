import React from 'react';
import { PieceType } from '../../../../interfaces/piece';
import { PlayerColor } from '../../../../interfaces/player';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { DragAndDropTypes } from '../../../../contants/dragAndDropTypes';
import { getPieceUrl } from '../../../../utils/getPieceUrl';

interface Props {
  type: PieceType;
  pieceColor: PlayerColor;
  onDragBegin?: () => void;
}

const PieceIcon: React.FC<Props> = ({ type, pieceColor, onDragBegin }) => {
  const pieceUrl = getPieceUrl(pieceColor, type);

  const [{}, drag, preview] = useDrag({
    item: { type: DragAndDropTypes.PIECE },
    begin: () => onDragBegin(),
  });

  return (
    <>
      <DragPreviewImage
        src={`/assets/images/chess/${pieceUrl}.png`}
        connect={preview}
      />

      <img
        ref={drag}
        src={`/assets/images/chess/${pieceUrl}.png`}
        alt={`${type} ${pieceColor}`}
      />
    </>
  );
};

export default PieceIcon;