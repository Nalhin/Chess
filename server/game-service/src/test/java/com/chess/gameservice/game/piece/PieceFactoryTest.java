package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.player.PlayerColor;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class PieceFactoryTest {

    @Test
    void buildPawnPiece() {
        var piece = PieceFactory.buildPiece(PieceType.PAWN, PlayerColor.BLACK);

        assertTrue(piece instanceof Pawn);
    }

    @Test
    void buildKnightPiece() {
        var piece = PieceFactory.buildPiece(PieceType.KNIGHT, PlayerColor.BLACK);

        assertTrue(piece instanceof Knight);
    }

    @Test
    void buildBishopPiece() {
        var piece = PieceFactory.buildPiece(PieceType.BISHOP, PlayerColor.BLACK);

        assertTrue(piece instanceof Bishop);
    }

    @Test
    void buildRookPiece() {
        var piece = PieceFactory.buildPiece(PieceType.ROOK, PlayerColor.BLACK);

        assertTrue(piece instanceof Rook);
    }

    @Test
    void buildQueenPiece() {
        var piece = PieceFactory.buildPiece(PieceType.QUEEN, PlayerColor.BLACK);

        assertTrue(piece instanceof Queen);
    }

    @Test
    void buildKingPiece() {
        var piece = PieceFactory.buildPiece(PieceType.KNIGHT, PlayerColor.BLACK);

        assertTrue(piece instanceof Knight);
    }

}