package com.chess.gameservice.game.piece;


public enum PieceType {
    PAWN(1), KNIGHT(2), BISHOP(3), ROOK(4), QUEEN(5), KING(6);

    PieceType(int type) {
        value = type;
    }

    public final int value;
}
