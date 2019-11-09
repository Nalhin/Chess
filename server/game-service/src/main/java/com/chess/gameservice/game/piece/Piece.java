package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public abstract class Piece {

    private PlayerColor playerColor;

    static ArrayList<Position> getMovesInDirection(Board board, Position initialPosition, int dx, int dy) {
        var availableMoves = new ArrayList<Position>();
        var position = new Position(initialPosition.getX(), initialPosition.getY());

        while (position.isWithinBounds()) {
            var newX = position.getX() + dx;
            var newY = position.getY() + dy;
            position.setX(newX);
            position.setY(newY);
            if (!position.isWithinBounds()) {
                break;
            }
            if (!board.isBoardPositionEmpty(position)) {
                break;
            }
            availableMoves.add(new Position(newX, newY));
        }
        return availableMoves;
    }

    public abstract ArrayList<Position> getAvailableMoves(Board board, Position initialPosition);

    public abstract boolean isMoveLegal(Position currentPosition, Position destinationPosition, Board board);

}
