package com.chess.gameservice.game.board;

import com.chess.gameservice.game.piece.*;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;

import java.util.ArrayList;


public class CheckChecker {

    static final boolean[] bishopThreats = {true, false, true, false, false, true, false, true};
    static final boolean[] rookThreats = {false, true, false, true, true, false, true, false};
    static final boolean[] queenThreats = {true, true, true, true, true, true, true, true};
    static final boolean[] kingThreats = {true, true, true, true, true, true, true, true};
    static final int[] rowDirections = {-1, -1, -1, 0, 0, 1, 1, 1};
    static final int[] colDirections = {-1, 0, 1, -1, 1, -1, 0, 1};


    public static boolean isSquareThreatened(Board board, Position threatenedPosition, PlayerColor threatenedColor) {
        final boolean kill = threatenedColor.equals(PlayerColor.WHITE);
        final boolean[] pawnThreats = {kill, false, kill, false, false, !kill, false, !kill};

        if (isThreatenedByKnight(board, threatenedPosition, threatenedColor)) {
            return true;
        }

        for (int dir = Board.BOTTOM_ROW; dir <= Board.BOARD_SIZE; dir++) {
            int x = threatenedPosition.getX();
            int y = threatenedPosition.getY();
            int dx = rowDirections[dir];
            int dy = colDirections[dir];

            for (int distanceFromOrigin = Board.BOTTOM_ROW; distanceFromOrigin <= Board.BOARD_SIZE; distanceFromOrigin++) {
                x += dx;
                y += dy;

                Position dirPosition = new Position(x, y);
                if (!dirPosition.isWithinBounds()) {
                    break;
                }
                Piece piece = board.getPieceByPosition(dirPosition);
                if (piece != null) {
                    if (piece.getPlayerColor() == threatenedColor) {
                        break;
                    }
                    if (isThreatInDirection(piece, distanceFromOrigin, dir, pawnThreats)) {
                        return true;
                    } else {
                        //direction is blocked;
                        break;
                    }
                }
            }
        }
        return false;
    }

    private static boolean isThreatInDirection(Piece piece,
                                               int distanceFromOrigin, int direction, boolean[] pawnThreats) {
        if (distanceFromOrigin == 0) {
            if (piece instanceof Pawn && pawnThreats[direction]) {
                return true;
            }
            if (piece instanceof King && kingThreats[direction]) {
                return true;
            }
        }

        if (piece instanceof Bishop && bishopThreats[direction]) {
            return true;
        }
        if (piece instanceof Rook && rookThreats[direction]) {
            return true;
        }
        if (piece instanceof Queen && queenThreats[direction]) {
            return true;
        }

        return false;
    }

    private static boolean isThreatenedByKnight(Board board, Position position, PlayerColor threatenedColor) {
        Piece knight = PieceFactory.buildPiece(PieceType.KNIGHT, threatenedColor);
        return knight.getAvailableMoves(board, position)
                .stream()
                .map(board::getPieceByPosition)
                .anyMatch(piece -> piece instanceof Knight && piece.getPlayerColor() != threatenedColor);

    }


    public static boolean willMoveResultInCheck(Board board, Position initialPosition, Position destinationPosition) {
        Piece piece = board.getPieceByPosition(initialPosition);
        PlayerColor playerColor = piece.getPlayerColor();
        Piece removedPiece = board.getPieceByPosition(destinationPosition);
        boolean isFirstMove = piece.isFirstMove();
        piece.setFirstMove(false);

        if (piece instanceof King) {
            board.setKingPosition(piece.getPlayerColor(), destinationPosition);
        }

        board.setBoardPosition(destinationPosition, piece);
        board.setBoardPosition(initialPosition, null);
        Position kingPosition = board.getKingPosition(playerColor);

        boolean isChecked = isCheck(board, kingPosition, piece.getPlayerColor());

        board.setBoardPosition(destinationPosition, removedPiece);
        board.setBoardPosition(initialPosition, piece);
        piece.setFirstMove(isFirstMove);

        if (piece instanceof King) {
            board.setKingPosition(piece.getPlayerColor(), initialPosition);
        }
        return isChecked;
    }

    private static boolean isCheck(Board board, Position kingPosition, PlayerColor playerColor) {
        return isSquareThreatened(board, kingPosition, playerColor);
    }

    private static boolean isCheckMate(Board board, Position kingPosition, PlayerColor playerColor) {
        Piece king = board.getPieceByPosition(kingPosition);

        ArrayList<Position> kingMoves = king.getAvailableMoves(board, kingPosition);
        boolean canKingMoveOutOfCheck = kingMoves
                .stream()
                .noneMatch(move -> isSquareThreatened(board, move,
                        playerColor));

        if (canKingMoveOutOfCheck) {
            return false;
        }
        return !canCheckBeBroken(board, kingPosition, playerColor);
    }


    private static boolean canCheckBeBroken(Board board, Position position, PlayerColor playerColor) {
        for (int i = 0; i <= Board.BOARD_SIZE; i++) {
            for (int j = 0; j <= Board.BOARD_SIZE; j++) {
                Piece piece = board.getPieceByPosition(position);
                if (piece != null && piece.getPlayerColor() == playerColor) {
                    boolean willStop = piece.getAvailableMoves(board, position).stream()
                            .anyMatch(pos -> !willMoveResultInCheck(board, position, pos));
                    if (willStop) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public static CheckState getCheckState(Board board, PlayerColor playerColor) {
        Position kingPosition = board.getKingPosition(playerColor);

        if (isCheck(board, kingPosition, playerColor)) {
            if (isCheckMate(board, kingPosition, playerColor)) {
                return CheckState.CHECK_MATE;
            }
            return CheckState.CHECK;
        }
        return CheckState.NONE;
    }

}
