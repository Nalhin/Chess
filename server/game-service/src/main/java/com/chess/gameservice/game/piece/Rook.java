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
public class Rook extends Piece {

    Rook(PlayerColor playerColor) {
        super(playerColor, PieceType.ROOK);
    }

    @Override
    public ArrayList<Position> getAvailableMoves(Board board, Position initialPosition) {
        var availableMoves = new ArrayList<Position>();

        int[] dx = {1, 0, -1, 0};
        int[] dy = {0, 1, 0, -1};
        for (int i = 0; i < dx.length; i++) {
            availableMoves.addAll(getMovesInDirection(board, initialPosition, dx[i], dy[i]));
        }

        return availableMoves;
    }


    @Override
    public boolean isMoveLegal(Position currentPosition, Position destinationPosition, Board board) {
        if (!board.isTakenPositionMovable(destinationPosition, getPlayerColor())) {
            return false;
        }
        return isLineMoveLegal(currentPosition, destinationPosition, board);
    }

    public static Position getCastlingInitialPosition(Position kingPosition) {
        if (kingPosition.getY() == King.SHORT_CASTLING_Y) {
            return new Position(kingPosition.getX(), Board.BOARD_SIZE);
        }
        if (kingPosition.getY() == King.LONG_CASTLING_Y) {
            return new Position(kingPosition.getX(), Board.BOTTOM_ROW);
        }
         return null;
    }

    public static Position getCastlingDestinationPosition(Position rookPosition) {
        if (rookPosition.getY() == Board.BOARD_SIZE) {
            return new Position(rookPosition.getX(), King.SHORT_CASTLING_Y - 1);
        }
        if (rookPosition.getY() == Board.BOTTOM_ROW) {
            return new Position(rookPosition.getX(), King.LONG_CASTLING_Y + 1);
        }
        throw new IllegalArgumentException();
    }

}
