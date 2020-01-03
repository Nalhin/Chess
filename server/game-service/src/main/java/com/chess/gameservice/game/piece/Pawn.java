package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Setter
@Getter
@NoArgsConstructor
public class Pawn extends Piece {

    Position enPassantableBy;

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

        for (Position position : getLeftAndRightPosition(initialPosition)) {
            if (!position.isWithinBounds()) {
                break;
            }
            Piece piece = board.getPieceByPosition(position);
            if (isPieceEnPassantable(piece, initialPosition) && ((Pawn) piece).getEnPassantableBy().equals(initialPosition) &&
                    piece.getPlayerColor() != getPlayerColor()
            ) {
                availableMoves.add(new Position(position.getX() + getDirection(), position.getY()));
            }
        }

        return availableMoves;
    }

    @Override
    public boolean isMoveLegal(Position currentPosition, Position destinationPosition, Board board) {
        int direction = getDirection();
        if (isMoveEnPassant(currentPosition, destinationPosition, board)) {
            Position enemyPiecePosition = new Position(destinationPosition.getX() - getDirection(), destinationPosition.getY());
            if (!enemyPiecePosition.isWithinBounds()) {
                return false;
            }
            Piece enemyPiece = board.getPieceByPosition(enemyPiecePosition);
            if (enemyPiece instanceof Pawn && ((Pawn) enemyPiece).getEnPassantableBy().equals(currentPosition)) {
                return true;

            }
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
        super.makeMove(initialPosition, destinationPosition, board);
        if (destinationPosition.getX() == Board.BOTTOM_ROW || destinationPosition.getX() == Board.BOARD_SIZE) {
            board.setPositionAwaitingPromotion(destinationPosition);
        }
        if (isLongMove(initialPosition, destinationPosition)) {
            addPositionsEnPassantableBy(destinationPosition, board);
        }
        if (isMoveEnPassant(initialPosition, destinationPosition, board)) {
            Position pawnToRemove = new Position(initialPosition.getX(), destinationPosition.getY());
            board.addPieceToGraveyardByPosition(pawnToRemove);
            board.setBoardPosition(pawnToRemove, null);
        }
    }

    private boolean isLongMove(Position initialPosition, Position destinationPosition) {
        return Math.abs(initialPosition.getX() - destinationPosition.getX()) == 2;
    }

    private void addPositionsEnPassantableBy(Position destinationPosition, Board board) {

        Position[] enPassablePositions = getLeftAndRightPosition(destinationPosition);

        for (Position position : enPassablePositions) {
            if (position.isWithinBounds()) {
                Piece piece = board.getPieceByPosition(position);
                if (piece instanceof Pawn && piece.getPlayerColor() != getPlayerColor()) {
                    setEnPassantableBy(position);
                }
            }
        }
    }

    Position[] getLeftAndRightPosition(Position position) {
        return new Position[]{new Position(position.getX(), position.getY() + 1),
                new Position(position.getX(), position.getY() - 1)};
    }

    private boolean isMoveEnPassant(Position initialPosition, Position destinationPosition, Board board) {
        return initialPosition.getX() != destinationPosition.getX() &&
                initialPosition.getY() != destinationPosition.getY() &&
                board.getPieceByPosition(destinationPosition) == null;
    }

    private boolean isPieceEnPassantable(Piece enemyPiece, Position currentPosition) {
        if (enemyPiece instanceof Pawn) {
            Position enPassantable = ((Pawn) enemyPiece).getEnPassantableBy();
            if (enPassantable != null) {
                return enPassantable.equals(currentPosition);
            }
        }
        return false;
    }

    public void clearEnPassantPositions() {
        enPassantableBy = null;
    }
}
