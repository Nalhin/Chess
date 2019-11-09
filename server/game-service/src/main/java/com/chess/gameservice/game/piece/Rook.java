package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.position.Position;

import java.util.ArrayList;

public class Rook extends Piece {
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
        if (!destinationPosition.isWithinBounds()) {
            return false;
        }
        if (currentPosition.getX() == destinationPosition.getX()) {
            return true;
        }
        if (currentPosition.getY() == destinationPosition.getY()) {
            return true;
        }
        return false;
    }

}
