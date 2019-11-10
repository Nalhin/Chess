package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Setter
@Getter
@NoArgsConstructor
public class Queen extends Piece {
    Queen(PlayerColor playerColor) {
        super(playerColor);
    }

    @Override
    public ArrayList<Position> getAvailableMoves(Board board, Position initialPosition) {

        var availableMoves = new ArrayList<Position>();

        int[] dx = {1, 1, 0, -1, -1, -1, 0, 1};
        int[] dy = {0, 1, 1, 1, 0, -1, -1, -1};

        for (int i = 0; i < dx.length; i++) {
            availableMoves.addAll(getMovesInDirection(board, initialPosition, dx[i], dy[i]));
        }

        return availableMoves;

    }

    @Override
    public boolean isMoveLegal(Position currentPosition, Position destinationPosition, Board board) {
        if (isMoveImpossible(currentPosition, destinationPosition)) {
            return false;
        }
        if (isDiagonalMoveLegal(currentPosition, destinationPosition, board)) {
            return true;
        }
        return isLineMoveLegal(currentPosition, destinationPosition, board);
    }
}
