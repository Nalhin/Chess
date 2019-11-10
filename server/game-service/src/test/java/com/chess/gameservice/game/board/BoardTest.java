package com.chess.gameservice.game.board;

import com.chess.gameservice.game.piece.King;
import com.chess.gameservice.game.piece.Pawn;
import com.chess.gameservice.game.piece.Queen;
import com.chess.gameservice.game.piece.Rook;
import com.chess.gameservice.game.position.Position;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

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

    @Test
    void isBoardPositionEmptyTest() {
        var emptyPosition = new Position(4, 4);

        assertTrue(board.isBoardPositionEmpty(emptyPosition));

        var takenPosition = new Position(1, 1);

        assertFalse(board.isBoardPositionEmpty(takenPosition));
    }

    @Test
    void movePieceTest() {
        var pawnPosition = new Position(1, 0);
        var legalDestinationPosition = new Position(3, 0);

        board.movePiece(pawnPosition, legalDestinationPosition);
        var newPawnPosition = board.getBoard()[legalDestinationPosition.getX()][legalDestinationPosition.getY()];

        assertTrue(newPawnPosition instanceof Pawn);
    }

    @Test
    void movePieceIllegalDestinationTest() {
        var pawnPosition = new Position(1, 0);
        var illegalDestinationPosition = new Position(4, 0);

        assertThrows(IllegalArgumentException.class, () -> {
            board.movePiece(pawnPosition, illegalDestinationPosition);
        });

        var newPawnPosition = board.getBoard()[illegalDestinationPosition.getX()][illegalDestinationPosition.getY()];
        assertNull(newPawnPosition);
    }


}