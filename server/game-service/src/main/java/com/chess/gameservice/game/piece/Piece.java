package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.UUID;


@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties("firstMove")
public abstract class Piece implements Serializable {

    private boolean isFirstMove = true;
    private PlayerColor playerColor;
    private PieceType type;

    public Piece(PlayerColor playerColor, PieceType type) {
        this.playerColor = playerColor;
        this.type = type;
    }

    ArrayList<Position> getMovesInDirection(Board board, Position initialPosition, int dx, int dy) {
        ArrayList<Position> availableMoves = new ArrayList<Position>();
        Position position = new Position(initialPosition.getX(), initialPosition.getY());

        while (true) {
            position.setX(position.getX() + dx);
            position.setY(position.getY() + dy);
            if (!position.isWithinBounds()) {
                break;
            }
            if (!board.isBoardPositionEmpty(position)) {
                if (board.isTakenPositionMovable(position, playerColor)) {
                    availableMoves.add(new Position(position.getX(),position.getY()));
                }
                break;
            }

            availableMoves.add(new Position(position.getX(),position.getY()));
        }
        return availableMoves;
    }

    public boolean isMoveImpossible(Position initialPosition, Position destinationPosition) {
        if (!destinationPosition.isWithinBounds()) {
            return true;
        }
        return initialPosition.equals(destinationPosition);
    }

    boolean isDiagonalMoveLegal(Position currentPosition, Position destinationPosition, Board board) {
        int diffX = destinationPosition.getX() - currentPosition.getX();
        int diffY = destinationPosition.getY() - currentPosition.getY();

        if (Math.abs(diffX) != Math.abs(diffY)) {
            return false;
        }

        int dx = diffX > 0 ? 1 : -1;
        int dy = diffY > 0 ? 1 : -1;

        return isDirectionUnobstructed(currentPosition, destinationPosition, board, dx, dy);
    }

    boolean isLineMoveLegal(Position currentPosition, Position destinationPosition, Board board) {

        if (currentPosition.getX() == destinationPosition.getX()) {
            int dy = destinationPosition.getY() - currentPosition.getY() > 0 ? 1 : -1;
            int dx = 0;
            return isDirectionUnobstructed(currentPosition, destinationPosition, board, dx, dy);
        }
        if (currentPosition.getY() == destinationPosition.getY()) {
            int dx = destinationPosition.getX() - currentPosition.getX() > 0 ? 1 : -1;
            int dy = 0;
            return isDirectionUnobstructed(currentPosition, destinationPosition, board, dx, dy);
        }
        return false;
    }

    private boolean isDirectionUnobstructed(Position currentPosition, Position destinationPosition,
                                            Board board, int dx, int dy) {

        Position position = new Position(currentPosition.getX(), currentPosition.getY());
        do {
            position.setX(position.getX() + dx);
            position.setY(position.getY() + dy);

            if (destinationPosition.equals(position)) {
                return true;
            }

            if (!board.isBoardPositionEmpty(position)) {
                return false;
            }
        } while (true);
    }

    public void makeMove(Position initialPosition,Position destinationPosition,Board board){
        board.setEnPessantPosition(null);
        board.setBoardPosition(destinationPosition,this);
        board.setBoardPosition(initialPosition,null);
        setFirstMove(false);
    }

    public abstract ArrayList<Position> getAvailableMoves(Board board, Position initialPosition);

    public abstract boolean isMoveLegal(Position currentPosition, Position destinationPosition, Board board);

}
