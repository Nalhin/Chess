package com.chess.gameservice.game.board;

import com.chess.gameservice.game.piece.King;
import com.chess.gameservice.game.piece.Pawn;
import com.chess.gameservice.game.piece.Queen;
import com.chess.gameservice.game.piece.Rook;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class BoardTest {

    private Board board;

    @BeforeEach
    void setUp() {
        board = new Board();
    }

    @Test
    void constructorWhiteTest() {

        assertTrue(board.getBoard()[0][0] instanceof Rook);
        assertTrue(board.getBoard()[1][0] instanceof Pawn);
        assertTrue(board.getBoard()[1][7] instanceof Pawn);
        assertTrue(board.getBoard()[0][7] instanceof Rook);
        assertTrue(board.getBoard()[0][4] instanceof King);
        assertTrue(board.getBoard()[0][3] instanceof Queen);
    }

    @Test
    void constructorBlackTest() {
        assertTrue(board.getBoard()[7][0] instanceof Rook);
        assertTrue(board.getBoard()[6][0] instanceof Pawn);
        assertTrue(board.getBoard()[6][7] instanceof Pawn);
        assertTrue(board.getBoard()[7][7] instanceof Rook);
        assertTrue(board.getBoard()[7][4] instanceof King);
        assertTrue(board.getBoard()[7][3] instanceof Queen);
    }
}