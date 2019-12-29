package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class QueenTest {
    private Board board;

    @BeforeEach
    void setUp() {
        var testBoard = new Piece[8][8];
        board = new Board();
        board.setState(testBoard);
    }

    @Test
    void getAvailableMoves() {
        var queen = new Queen(PlayerColor.BLACK);
        var queenPosition = new Position(4, 4);
        var expectedMoves = new ArrayList<Position>();
        int[] positionsX = {5, 6, 7, 5, 6, 7, 4, 4, 4, 3,
                2, 1, 3, 2, 1, 0, 3, 2, 1, 0, 4, 4, 4, 4, 5, 6, 7};
        int[] positionsY = {4, 4, 4, 5, 6, 7, 5, 6, 7,
                5, 6, 7, 4, 4, 4, 4, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1};
        for (int i = 0; i < positionsX.length; i++) {
            expectedMoves.add(new Position(positionsX[i], positionsY[i]));
        }

        var availableMoves = queen.getAvailableMoves(board, queenPosition);

        assertArrayEquals(expectedMoves.toArray(), availableMoves.toArray());
    }

    @Test
    void isMoveLegalXAxis() {
        var currentPosition = new Position(4, 1);
        var queen = new Queen(PlayerColor.BLACK);

        var destinationPositionLegal = new Position(7, 1);
        assertTrue(queen.isMoveLegal(currentPosition, destinationPositionLegal, board));

        var destinationPositionIllegal = new Position(7, 2);
        assertFalse(queen.isMoveLegal(currentPosition, destinationPositionIllegal, board));

    }

    @Test
    void isMoveLegalXDiagonal() {
        var currentPosition = new Position(4, 1);
        var queen = new Queen(PlayerColor.BLACK);

        var destinationPositionLegal = new Position(6, 3);
        assertTrue(queen.isMoveLegal(currentPosition, destinationPositionLegal, board));

        var destinationPositionIllegal = new Position(7, 3);
        assertFalse(queen.isMoveLegal(currentPosition, destinationPositionIllegal, board));

    }
}