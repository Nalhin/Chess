import React from 'react';
import { Piece } from '../../interfaces/Game/Piece';
import { StyledBoardContainer } from '../../pages/GameRoom/Game/Board/Board';
import { StyledCell } from '../../pages/GameRoom/Game/Board/Cell';
import { StyledChessImage } from '../../pages/GameRoom/Game/Board/PieceIcon';
import { getPieceUrl } from '../../utils/getPieceUrl';
import { Fade, useTheme } from '@material-ui/core';

interface Props {
  boardState: Piece[][];
}

const BoardStateless: React.FC<Props> = ({ boardState }) => {
  const theme = useTheme();
  return (
    <StyledBoardContainer>
      {boardState.map((row, x) =>
        row.map((cell, y) => (
          <StyledCell key={`${x}${y}`} theme={theme}>
            {cell?.type && (
              <Fade in>
                <StyledChessImage
                  theme={theme}
                  src={getPieceUrl(cell.playerColor, cell.type)}
                  alt={`${cell.playerColor} ${cell.type}`}
                />
              </Fade>
            )}
          </StyledCell>
        )),
      )}
    </StyledBoardContainer>
  );
};

export default BoardStateless;
