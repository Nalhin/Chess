package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.position.Position;

import java.util.ArrayList;

public class King extends Piece {

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
        if (!destinationPosition.isWithinBounds()) {
            return false;
        }
        if (currentPosition.equals(destinationPosition)) {
            return false;
        }
        if (Math.abs(currentPosition.getX() - destinationPosition.getX()) <= 1
                && Math.abs(currentPosition.getX() - destinationPosition.getX()) >= 0
                && Math.abs(currentPosition.getY() - destinationPosition.getY()) <= 1
                && Math.abs(currentPosition.getX() - destinationPosition.getX()) >= 0) {
            return true;
        }
        return false;
    }
}
