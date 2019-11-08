package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.position.Position;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class KnightTest {

    private Board board;

    @BeforeEach
    void setUp() {
        Piece[][] testBoard = new Piece[8][8];
        board = new Board();
        board.setBoard(testBoard);
    }

    @Test
    void getAvailableMoves() {
        var knight = new Knight();
        var knightPosition = new Position(4, 4);
        ArrayList<Position> expectedMoves = new ArrayList<>();
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
        var boardWithPositionTaken = board.getBoard();
        boardWithPositionTaken[2][3] = new Knight();
        boardWithPositionTaken[5][6] = new Knight();
        board.setBoard(boardWithPositionTaken);
        var knight = new Knight();
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
        var knight = new Knight();
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
        var knight = new Knight();

        var destinationPositionLegal = new Position(3, 2);
        assertTrue(knight.isMoveLegal(currentPosition, destinationPositionLegal));

        var destinationPositionIllegal = new Position(3, 3);
        assertFalse(knight.isMoveLegal(currentPosition, destinationPositionIllegal));

        var destinationPositionOutOfBounds = new Position(-1, 0);
        assertFalse(knight.isMoveLegal(currentPosition, destinationPositionOutOfBounds));
    }
}