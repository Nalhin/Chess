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
        while (x-- > 0) {
            if (board.getBoard()[x][y] != null) {
                break;
            }
            availableMoves.add(new Position(x, y));
        }

        x = initialPosition.getX();
        while (x++ < 7) {
            if (board.getBoard()[x][y] != null) {
                break;
            }
            availableMoves.add(new Position(x, y));
        }

        x = initialPosition.getX();
        while (y-- > 0) {
            if (board.getBoard()[x][y] != null) {
                break;
            }
            availableMoves.add(new Position(x, y));
        }
        y = initialPosition.getY();
        while (y++ < 7) {
            if (board.getBoard()[x][y] != null) {
                break;
            }
            availableMoves.add(new Position(x, y));
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
