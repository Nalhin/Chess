package com.chess.gameservice.game.piece;


public class PieceFactory {

    public static Piece buildPiece(PieceType pieceType) {
        switch (pieceType) {
            case PAWN:
                return new Pawn();
            case KNIGHT:
                return new Knight();
            case BISHOP:
                return new Bishop();
            case ROOK:
                return new Rook();
            case QUEEN:
                return new Queen();
            case KING:
                return new King();
        }
        return null;
    }
}
