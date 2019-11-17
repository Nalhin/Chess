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
        super(playerColor,PieceType.PAWN);
    }

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

        if (isMoveImpossible(currentPosition, destinationPosition)) {
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

    private int getDirection() {
        return getPlayerColor() == PlayerColor.BLACK ? -1 : 1;
    }

    //TODO
    void move() {
        isFirstMove = false;
    }
}
