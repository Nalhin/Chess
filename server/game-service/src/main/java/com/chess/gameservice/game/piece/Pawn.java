package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Setter
@Getter
@NoArgsConstructor
public class Pawn extends Piece {

    @JsonIgnore
    private boolean isFirstMove = true;

    Pawn(PlayerColor playerColor) {
        super(playerColor, PieceType.PAWN);
    }

    @Override
    public ArrayList<Position> getAvailableMoves(Board board, Position initialPosition) {
        var direction = getDirection();
        var availableMoves = new ArrayList<Position>();
        int[] dx = {1, 1};
        int[] dy = {1, -1};

        for (int i = 0; i < dx.length; i++) {
            var position = new Position(initialPosition.getX() + dx[i] * direction, initialPosition.getY() + dy[i]);
            if (position.isWithinBounds() && board.isPositionTakenByAttackableEnemy(position, getPlayerColor())) {
                availableMoves.add(position);
            }
        }

        var forwardPosition = new Position(initialPosition.getX() + direction, initialPosition.getY());
        if (board.isBoardPositionEmpty(forwardPosition)) {
            availableMoves.add(forwardPosition);
        }

        if (isFirstMove) {
            var position = new Position(initialPosition.getX() + direction * 2, initialPosition.getY());
            if (board.isBoardPositionEmpty(position)) {
                availableMoves.add(position);
            }
        }
        return availableMoves;
    }

    @Override
    public boolean isMoveLegal(Position currentPosition, Position destinationPosition, Board board) {
        var direction = getDirection();

        if (currentPosition.getY() != destinationPosition.getY()) {
            if (Math.abs(currentPosition.getY() - destinationPosition.getY()) == 1) {
                return board.isPositionTakenByAttackableEnemy(destinationPosition, getPlayerColor());
            }
            return false;
        }
        if (destinationPosition.getX() - currentPosition.getX() == direction) {
            return true;
        }
        return isFirstMove && destinationPosition.getX() - currentPosition.getX() == (2 * direction);
    }

    private int getDirection() {
        return getPlayerColor() == PlayerColor.WHITE ? -1 : 1;
    }

}
