package com.chess.gameservice.game.piece;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class PieceFactoryTest {

    @Test
    void buildPawnPiece() {
        Piece piece = PieceFactory.buildPiece(PieceType.PAWN);

        assertTrue(piece instanceof Pawn);
    }

    @Test
    void buildKnightPiece() {
        Piece piece = PieceFactory.buildPiece(PieceType.KNIGHT);

        assertTrue(piece instanceof Knight);
    }

    @Test
    void buildBishopPiece() {
        Piece piece = PieceFactory.buildPiece(PieceType.BISHOP);

        assertTrue(piece instanceof Bishop);
    }

    @Test
    void buildRookPiece() {
        Piece piece = PieceFactory.buildPiece(PieceType.ROOK);

        assertTrue(piece instanceof Rook);
    }

    @Test
    void buildQueenPiece() {
        Piece piece = PieceFactory.buildPiece(PieceType.QUEEN);

        assertTrue(piece instanceof Queen);
    }

    @Test
    void buildKingPiece() {
        Piece piece = PieceFactory.buildPiece(PieceType.KNIGHT);

        assertTrue(piece instanceof Knight);
    }

}