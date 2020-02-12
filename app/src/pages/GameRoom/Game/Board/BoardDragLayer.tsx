import { useDragLayer, XYCoord } from 'react-dnd';
import React from 'react';
import { DragAndDropTypes } from '../../../../interfaces/DragAndDrop/dragAndDropTypes';
import styled from '@emotion/styled';
import { useTheme } from '@material-ui/core';
import mixins from '../../../../styles/mixins';

const StyledContainer = styled.div`
  pointer-events: none;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const StyledChessImage = styled.img`
  ${props => mixins.getCellSize(props)};
`;

export function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export interface Props {}

const BoardDragLayer: React.FC<Props> = () => {
  const theme = useTheme();
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const renderItem = () => {
    if (DragAndDropTypes.PIECE === itemType) {
      return <StyledChessImage {...item} theme={theme} />;
    }
    return null;
  };

  if (!isDragging) {
    return null;
  }

  return (
    <StyledContainer>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </StyledContainer>
  );
};
export default BoardDragLayer;
