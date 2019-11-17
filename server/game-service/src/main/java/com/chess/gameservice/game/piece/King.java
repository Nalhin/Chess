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
public class King extends Piece {

    King(PlayerColor playerColor) {
        super(playerColor,PieceType.KING);
    }

    @Override
    public ArrayList<Position> getAvailableMoves(Board board, Position initialPosition) {
        var availableMoves = new ArrayList<Position>();

        int[] dx = {1, 1, 0, -1, -1, -1, 0, 1};
        int[] dy = {0, 1, 1, 1, 0, -1, -1, -1};

        for (int i = 0; i < dx.length; i++) {
            var position = new Position(initialPosition.getX() + dx[i], initialPosition.getY() + dy[i]);
            if (position.isWithinBounds()) {
                if (board.isBoardPositionEmpty(position)) {
                    availableMoves.add(position);
                }
            }
        }
        return availableMoves;
    }

    @Override
    public boolean isMoveLegal(Position currentPosition, Position destinationPosition, Board board) {
        if (isMoveImpossible(currentPosition, destinationPosition)) {
            return false;
        }
        return Math.abs(currentPosition.getX() - destinationPosition.getX()) <= 1
                && Math.abs(currentPosition.getX() - destinationPosition.getX()) >= 0
                && Math.abs(currentPosition.getY() - destinationPosition.getY()) <= 1
                && Math.abs(currentPosition.getX() - destinationPosition.getX()) >= 0;
    }
}
