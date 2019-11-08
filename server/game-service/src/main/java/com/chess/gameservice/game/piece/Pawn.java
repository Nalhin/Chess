package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;

import java.util.ArrayList;

public class Pawn extends Piece {
    private boolean isFirstMove = true;

    @Override
    public ArrayList<Position> getAvailableMoves(Board board, Position initialPosition) {
        var direction = getDirection();
        var availableMoves = new ArrayList<Position>();

        availableMoves.add(new Position(initialPosition.getX() + direction, initialPosition.getY()));

        if (isFirstMove) {
            availableMoves.add(new Position(initialPosition.getX() + direction * 2, initialPosition.getY()));
        }

        return availableMoves;
    }

    @Override
    public boolean isMoveLegal(Position currentPosition, Position destinationPosition, Board board) {
        var direction = getDirection();

        if (!destinationPosition.isWithinBounds()) {
            return false;
        }

        if (currentPosition.getY() != destinationPosition.getY()) {
            return false;
        }

        if (destinationPosition.getX() - currentPosition.getX() == direction) {
            return true;
        }
        return isFirstMove && destinationPosition.getX() - currentPosition.getX() == (2 * direction);
    }

    public int getDirection() {
        var playerColor = super.getPlayerColor();

        return playerColor == PlayerColor.BLACK ? -1 : 1;
    }

    //TODO
    public void move() {
        isFirstMove = false;
    }
}
