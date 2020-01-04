package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.awt.*;
import java.util.ArrayList;

@Setter
@Getter
@NoArgsConstructor
public class Pawn extends Piece {

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
            Position position = new Position(initialPosition.getX() + dx[i] * direction, initialPosition.getY() + dy[i]);
            if (position.isWithinBounds() && board.isPositionAttackable(position, getPlayerColor())) {
                availableMoves.add(position);
            }
        }

        Position forwardPosition = new Position(initialPosition.getX() + direction, initialPosition.getY());
        if (forwardPosition.isWithinBounds() && board.isBoardPositionEmpty(forwardPosition)) {
            availableMoves.add(forwardPosition);
        }

        if (isFirstMove()) {
            var position = new Position(initialPosition.getX() + direction * 2, initialPosition.getY());
            if (board.isBoardPositionEmpty(position)) {
                availableMoves.add(position);
            }
        }
        Position enPessantPosition = board.getEnPessantPosition();
        if (enPessantPosition != null &&
                enPessantPosition.getX() == initialPosition.getX()
                && Math.abs(initialPosition.getY() - enPessantPosition.getY()) == 1) {

            availableMoves.add(getCorrespondingEnPessantDestination(enPessantPosition));
        }

        return availableMoves;
    }

    @Override
    public boolean isMoveLegal(Position currentPosition, Position destinationPosition, Board board) {
        int direction = getDirection();
        if (isMoveEnPassant(destinationPosition, board)) {
            return true;
        }
        if (currentPosition.getY() != destinationPosition.getY()) {
            if (Math.abs(currentPosition.getY() - destinationPosition.getY()) == 1) {
                return board.isPositionTakenByAttackableEnemy(destinationPosition, getPlayerColor());
            }
            return false;
        }
        if (destinationPosition.getX() - currentPosition.getX() == direction) {
            return true;
        }

        return isFirstMove() && destinationPosition.getX() - currentPosition.getX() == (2 * direction);
    }

    private int getDirection() {
        return getPlayerColor() == PlayerColor.WHITE ? -1 : 1;
    }


    @Override
    public void makeMove(Position initialPosition, Position destinationPosition, Board board) {
        if (isMoveEnPassant(destinationPosition, board)) {
            Position pawnToRemove = board.getEnPessantPosition();
            board.addPieceToGraveyardByPosition(pawnToRemove);
            board.setBoardPosition(pawnToRemove, null);
        }

        super.makeMove(initialPosition, destinationPosition, board);

        if (destinationPosition.getX() == Board.BOTTOM_ROW || destinationPosition.getX() == Board.BOARD_SIZE) {
            board.setPositionAwaitingPromotion(destinationPosition);
        }
        if (isLongMove(initialPosition, destinationPosition)) {
            board.setEnPessantPosition(destinationPosition);
        }
    }

    private boolean isLongMove(Position initialPosition, Position destinationPosition) {
        return Math.abs(initialPosition.getX() - destinationPosition.getX()) == 2;
    }

    private boolean isMoveEnPassant(Position destinationPosition, Board board) {
        Position enPessantPosition = board.getEnPessantPosition();
        if (enPessantPosition == null) {
            return false;
        }
        return getCorrespondingEnPessantDestination(enPessantPosition).equals(destinationPosition);
    }

    private Position getCorrespondingEnPessantDestination(Position enPessantPosition) {
        return new Position(enPessantPosition.getX() + getDirection(), enPessantPosition.getY());
    }
}
