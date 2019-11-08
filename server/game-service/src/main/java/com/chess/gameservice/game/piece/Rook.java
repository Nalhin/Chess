package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.position.Position;

import java.util.ArrayList;

public class Rook extends Piece {
    @Override
    public ArrayList<Position> getAvailableMoves(Board board, Position initialPosition) {
        var availableMoves = new ArrayList<Position>();

        var x = initialPosition.getX();
        var y = initialPosition.getY();

        for (int i = x + 1; i <= 7; i++) {
            if (board.getBoard()[i][y] != null) {
                break;
            }
            availableMoves.add(new Position(i, y));
        }

        for (int i = y + 1; i <= 7; i++) {
            if (board.getBoard()[x][i] != null) {
                break;
            }
            availableMoves.add(new Position(x, i));
        }

        for (int i = x - 1; i >= 0; i--) {
            if (board.getBoard()[i][y] != null) {
                break;
            }
            availableMoves.add(new Position(i, y));
        }

        for (int i = y - 1; i >= 0; i--) {
            if (board.getBoard()[x][i] != null) {
                break;
            }
            availableMoves.add(new Position(x, i));
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
