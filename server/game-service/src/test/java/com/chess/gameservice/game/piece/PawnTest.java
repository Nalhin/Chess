package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class PawnTest {

    private Board board;

    @BeforeEach
    void setUp() {
        var testBoard = new Piece[8][8];
        board = new Board();
        board.setBoard(testBoard);
    }

    @Test
    void getAvailableMovesIsBlack() {
        var pawn = new Pawn(PlayerColor.BLACK);
        var pawnPosition = new Position(2, 2);
        var expectedMoves = new ArrayList<Position>();
        int[] positionsX = {1, 0};
        int[] positionsY = {2, 2};
        for (int i = 0; i < positionsX.length; i++) {
            expectedMoves.add(new Position(positionsX[i], positionsY[i]));
        }

        var availableMoves = pawn.getAvailableMoves(board, pawnPosition);

        assertArrayEquals(expectedMoves.toArray(), availableMoves.toArray());
    }

    @Test
    void getAvailableMovesIsWhite() {
        var pawn = new Pawn(PlayerColor.WHITE);
        var pawnPosition = new Position(2, 2);
        var expectedMoves = new ArrayList<Position>();
        int[] positionsX = {3, 4};
        int[] positionsY = {2, 2};
        for (int i = 0; i < positionsX.length; i++) {
            expectedMoves.add(new Position(positionsX[i], positionsY[i]));
        }

        var availableMoves = pawn.getAvailableMoves(board, pawnPosition);

        assertArrayEquals(expectedMoves.toArray(), availableMoves.toArray());
    }

    @Test
    void getAvailableMovesIsBlackNotFirstMove() {
        var pawn = new Pawn(PlayerColor.BLACK);
        pawn.move();
        var pawnPosition = new Position(2, 2);
        var expectedMoves = new ArrayList<Position>();
        int[] positionsX = {1};
        int[] positionsY = {2};
        for (int i = 0; i < positionsX.length; i++) {
            expectedMoves.add(new Position(positionsX[i], positionsY[i]));
        }

        var availableMoves = pawn.getAvailableMoves(board, pawnPosition);

        assertArrayEquals(expectedMoves.toArray(), availableMoves.toArray());
    }

    @Test
    void getAvailableMovesIsWhiteNotFirstMove() {
        var pawn = new Pawn(PlayerColor.BLACK);
        pawn.setPlayerColor(PlayerColor.WHITE);
        pawn.move();
        var pawnPosition = new Position(2, 2);
        var expectedMoves = new ArrayList<Position>();
        int[] positionsX = {3};
        int[] positionsY = {2};
        for (int i = 0; i < positionsX.length; i++) {
            expectedMoves.add(new Position(positionsX[i], positionsY[i]));
        }

        var availableMoves = pawn.getAvailableMoves(board, pawnPosition);

        assertArrayEquals(expectedMoves.toArray(), availableMoves.toArray());
    }

    @Test
    void isMoveLegalWhite() {
        var currentPosition = new Position(6, 1);
        var pawn = new Pawn(PlayerColor.WHITE);

        var destinationPositionLegal = new Position(7, 1);
        assertTrue(pawn.isMoveLegal(currentPosition, destinationPositionLegal, board));

        var destinationPositionIllegal = new Position(7, 2);
        assertFalse(pawn.isMoveLegal(currentPosition, destinationPositionIllegal, board));

        var destinationPositionOutOfBounds = new Position(8, 1);
        assertFalse(pawn.isMoveLegal(currentPosition, destinationPositionOutOfBounds, board));
    }

    @Test
    void isMoveLegalBlack() {
        var currentPosition = new Position(1, 1);
        var pawn = new Pawn(PlayerColor.BLACK);

        var destinationPositionLegal = new Position(0, 1);
        assertTrue(pawn.isMoveLegal(currentPosition, destinationPositionLegal, board));

        var destinationPositionIllegal = new Position(0, 2);
        assertFalse(pawn.isMoveLegal(currentPosition, destinationPositionIllegal, board));

        var destinationPositionOutOfBounds = new Position(-1, 0);
        assertFalse(pawn.isMoveLegal(currentPosition, destinationPositionOutOfBounds, board));
    }

    @Test
    void isMoveLegalWhiteNotFirstMove() {
        var currentPosition = new Position(5, 1);
        var pawn = new Pawn(PlayerColor.WHITE);
        pawn.move();

        var destinationPositionIllegal = new Position(7, 2);
        assertFalse(pawn.isMoveLegal(currentPosition, destinationPositionIllegal, board));
    }

    @Test
    void isMoveLegalBlackNotFirstMove() {
        var currentPosition = new Position(2, 1);
        var pawn = new Pawn(PlayerColor.BLACK);
        pawn.move();

        var destinationPositionIllegal = new Position(0, 2);
        assertFalse(pawn.isMoveLegal(currentPosition, destinationPositionIllegal, board));

    }
}