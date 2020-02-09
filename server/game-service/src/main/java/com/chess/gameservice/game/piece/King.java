package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.board.CheckChecker;
import com.chess.gameservice.game.board.CheckState;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.stream.Collectors;

import static com.chess.gameservice.game.piece.Rook.getCastlingDestinationPosition;

@Setter
@Getter
@NoArgsConstructor
public class King extends Piece implements Serializable {

    public static final int SHORT_CASTLING_Y = 6;
    public static final int LONG_CASTLING_Y = 2;

    King(PlayerColor playerColor) {
        super(playerColor, PieceType.KING);
    }


    @Override
    public ArrayList<Position> getAvailableMoves(Board board, Position initialPosition) {
        var availableMoves = new ArrayList<Position>();

        int[] dx = {1, 1, 0, -1, -1, -1, 0, 1};
        int[] dy = {0, 1, 1, 1, 0, -1, -1, -1};

        for (int i = 0; i < dx.length; i++) {
            Position position = new Position(initialPosition.getX() + dx[i], initialPosition.getY() + dy[i]);
            if (position.isWithinBounds()) {
                if (board.isTakenPositionMovable(position, getPlayerColor())) {
                    availableMoves.add(position);
                }
            }
        }
        availableMoves.addAll(getCastlingMoves(board, initialPosition));
        return availableMoves;
    }


    private ArrayList<Position> getCastlingMoves(Board board, Position initialPosition) {
        ArrayList<Position> castlingMoves = new ArrayList<>();
        if (!isFirstMove()) {
            return castlingMoves;
        }
        if (initialPosition.getX() != Board.BOTTOM_ROW && initialPosition.getX() != Board.BOARD_SIZE) {
            return castlingMoves;
        }
        if (board.getCheckState() != CheckState.NONE) {
            return castlingMoves;
        }

        return getAvailableKingCastlingPositions(board, initialPosition);
    }

    private ArrayList<Position> getAvailableKingCastlingPositions(Board board, Position initialPosition) {
        final int LONG_CASTLING_Y = 2;
        final int SHORT_CASTLING_Y = 6;
        Position[] possibleRookPositions = {new Position(initialPosition.getX(), Board.BOARD_SIZE), new Position(initialPosition.getX(), 0)};
        ArrayList<Position> eligiblePositions = new ArrayList<>();

        for (Position position : possibleRookPositions) {
            Piece piece = board.getPieceByPosition(position);

            if (piece instanceof Rook && piece.isFirstMove()) {
                if (position.getY() == Board.BOTTOM_ROW) {
                    eligiblePositions.add(new Position(initialPosition.getX(), LONG_CASTLING_Y));
                } else if ((position.getY() == Board.BOARD_SIZE)) {
                    eligiblePositions.add(new Position(initialPosition.getX(), SHORT_CASTLING_Y));
                }
            }
        }

        return eligiblePositions.stream()
                .filter(castlingPosition -> isCastlingCheckedOrBlocked(board, initialPosition, castlingPosition))
                .collect(Collectors.toCollection(ArrayList::new));
    }


    private boolean isCastlingCheckedOrBlocked(Board board, Position initialPosition, Position castlingPosition) {
        int dy = initialPosition.getY() - castlingPosition.getY() > 0 ? -1 : 1;
        Position position = new Position(initialPosition.getX(), initialPosition.getY());

        while (!position.equals(castlingPosition)) {
            int newY = position.getY() + dy;
            position.setY(newY);
            if (!board.isBoardPositionEmpty(position)) {
                return false;
            }
            if (CheckChecker.isSquareThreatened(board,position,getPlayerColor())) {
                return false;
            }
        }
        return true;
    }


    @Override
    public boolean isMoveLegal(Position currentPosition, Position destinationPosition, Board board) {
        if (Math.abs(currentPosition.getX() - destinationPosition.getX()) <= 1
                && Math.abs(currentPosition.getX() - destinationPosition.getX()) >= 0
                && Math.abs(currentPosition.getY() - destinationPosition.getY()) <= 1
                && Math.abs(currentPosition.getX() - destinationPosition.getX()) >= 0) {
            return true;
        }
        return isCastlingLegal(currentPosition, destinationPosition, board);
    }

    private boolean isCastlingLegal(Position initialPosition, Position destinationPosition, Board board) {

        if (!isFirstMove()) {
            return false;
        }
        if (board.getCheckState() != CheckState.NONE) {
            return false;
        }
        if (initialPosition.isBottomRow() && initialPosition.isTopRow()) {
            return false;
        }

        Position rookPosition = Rook.getCastlingInitialPosition(destinationPosition);
        if (rookPosition == null) {
            return false;
        }
        Piece rook = board.getPieceByPosition(rookPosition);
        if (!rook.isFirstMove() || !(rook instanceof Rook)) {
            return false;
        }
        return isCastlingCheckedOrBlocked(board, initialPosition, destinationPosition);
    }

    private boolean isCastling(Position initialPosition, Position destinationPosition) {
        return Math.abs(initialPosition.getY() - destinationPosition.getY()) > 1;
    }

    @Override
    public void makeMove(Position initialPosition, Position destinationPosition, Board board) {
        super.makeMove(initialPosition, destinationPosition, board);
        if (isCastling(initialPosition, destinationPosition)) {
            makeCastlingMove(destinationPosition, board);
        }
        board.setKingPosition(getPlayerColor(), destinationPosition);
    }

    private void makeCastlingMove(Position destinationPosition, Board board) {
        Position rookCastlingInitialPosition = Rook.getCastlingInitialPosition(destinationPosition);
        if (rookCastlingInitialPosition != null) {
            Position rookDestinationPosition = getCastlingDestinationPosition(rookCastlingInitialPosition);
            Piece rook = board.getPieceByPosition(rookCastlingInitialPosition);
            board.setBoardPosition(rookDestinationPosition, rook);
            board.setBoardPosition(rookCastlingInitialPosition, null);
        }
    }

}
