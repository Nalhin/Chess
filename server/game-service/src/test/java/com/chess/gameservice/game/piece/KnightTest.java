package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class KnightTest {

    private Board board;

    @BeforeEach
    void setUp() {
        var testBoard = new Piece[8][8];
        board = new Board();
        board.setState(testBoard);
    }

    @Test
    void getAvailableMoves() {
        var knight = new Knight(PlayerColor.BLACK);
        var knightPosition = new Position(4, 4);
        var expectedMoves = new ArrayList<Position>();
        int[] positionsX = {2, 2, 3, 5, 6, 6, 5, 3};
        int[] positionsY = {3, 5, 6, 6, 5, 3, 2, 2};
        for (int i = 0; i < positionsX.length; i++) {
            expectedMoves.add(new Position(positionsX[i], positionsY[i]));
        }

        var availableMoves = knight.getAvailableMoves(board, knightPosition);

        assertArrayEquals(expectedMoves.toArray(), availableMoves.toArray());
    }

    @Test
    void getAvailableMovesPositionTaken() {
        var boardWithPositionTaken = board.getState();
        boardWithPositionTaken[2][3] = new Knight(PlayerColor.BLACK);
        boardWithPositionTaken[5][6] = new Knight(PlayerColor.BLACK);
        board.setState(boardWithPositionTaken);
        var knight = new Knight(PlayerColor.BLACK);
        var knightPosition = new Position(4, 4);
        ArrayList<Position> expectedMoves = new ArrayList<>();
        int[] positionsX = {2, 3, 6, 6, 5, 3};
        int[] positionsY = {5, 6, 5, 3, 2, 2};
        for (int i = 0; i < positionsX.length; i++) {
            expectedMoves.add(new Position(positionsX[i], positionsY[i]));
        }

        var availableMoves = knight.getAvailableMoves(board, knightPosition);

        assertArrayEquals(expectedMoves.toArray(), availableMoves.toArray());
    }

    @Test
    void getAvailableMovesOutOfBounds() {
        var knight = new Knight(PlayerColor.BLACK);
        var knightPosition = new Position(7, 7);
        ArrayList<Position> expectedMoves = new ArrayList<>();
        int[] positionsX = {5, 6};
        int[] positionsY = {6, 5};
        for (int i = 0; i < positionsX.length; i++) {
            expectedMoves.add(new Position(positionsX[i], positionsY[i]));
        }

        var availableMoves = knight.getAvailableMoves(board, knightPosition);

        assertArrayEquals(expectedMoves.toArray(), availableMoves.toArray());
    }


    @Test
    void isMoveLegal() {
        var currentPosition = new Position(1, 1);
        var knight = new Knight(PlayerColor.BLACK);

        var destinationPositionLegal = new Position(3, 2);
        assertTrue(knight.isMoveLegal(currentPosition, destinationPositionLegal, board));

        var destinationPositionIllegal = new Position(3, 3);
        assertFalse(knight.isMoveLegal(currentPosition, destinationPositionIllegal, board));
    }
}