package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class KingTest {
    private Board board;

    @BeforeEach
    void setUp() {
        var testBoard = new Piece[8][8];
        board = new Board();
        board.setState(testBoard);
    }

    @Test
    void getAvailableMoves() {
        var king = new King(PlayerColor.BLACK);
        var bishopPosition = new Position(4, 4);
        var expectedMoves = new ArrayList<Position>();
        int[] positionsX = {5, 5, 4, 3, 3, 3, 4, 5};
        int[] positionsY = {4, 5, 5, 5, 4, 3, 3, 3};
        for (int i = 0; i < positionsX.length; i++) {
            expectedMoves.add(new Position(positionsX[i], positionsY[i]));
        }

        var availableMoves = king.getAvailableMoves(board, bishopPosition);

        assertArrayEquals(expectedMoves.toArray(), availableMoves.toArray());
    }

    @Test
    void isMoveLegal() {
        var currentPosition = new Position(0, 1);
        var king = new King(PlayerColor.BLACK);

        var destinationPositionLegal = new Position(1, 1);
        assertTrue(king.isMoveLegal(currentPosition, destinationPositionLegal, board));

        var destinationPositionIllegal = new Position(2, 1);
        assertFalse(king.isMoveLegal(currentPosition, destinationPositionIllegal, board));

    }
}