package com.chess.gameservice.game.piece;


import com.chess.gameservice.game.player.PlayerColor;

public class PieceFactory {

    public static Piece buildPiece(PieceType pieceType, PlayerColor playerColor) {
        switch (pieceType) {
            case PAWN:
                return new Pawn(playerColor);
            case KNIGHT:
                return new Knight(playerColor);
            case BISHOP:
                return new Bishop(playerColor);
            case ROOK:
                return new Rook(playerColor);
            case QUEEN:
                return new Queen(playerColor);
            case KING:
                return new King(playerColor);
            default:
                throw new IllegalArgumentException("Invalid piece type");
        }
    }
}
