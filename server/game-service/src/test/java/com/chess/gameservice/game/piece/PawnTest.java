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
        board.setState(testBoard);
    }

    @Test
    void getAvailableMovesIsBlack() {
        var pawn = new Pawn(PlayerColor.WHITE);
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
        var pawn = new Pawn(PlayerColor.BLACK);
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
        var pawn = new Pawn(PlayerColor.WHITE);
        pawn.setFirstMove(false);
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
        pawn.setPlayerColor(PlayerColor.BLACK);
        pawn.setFirstMove(false);
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
        var pawn = new Pawn(PlayerColor.BLACK);

        var destinationPositionLegal = new Position(7, 1);
        assertTrue(pawn.isMoveLegal(currentPosition, destinationPositionLegal, board));

        var destinationPositionIllegal = new Position(7, 2);
        assertFalse(pawn.isMoveLegal(currentPosition, destinationPositionIllegal, board));
    }

    @Test
    void isMoveLegalBlack() {
        var currentPosition = new Position(1, 1);
        var pawn = new Pawn(PlayerColor.WHITE);

        var destinationPositionLegal = new Position(0, 1);
        assertTrue(pawn.isMoveLegal(currentPosition, destinationPositionLegal, board));

        var destinationPositionIllegal = new Position(0, 2);
        assertFalse(pawn.isMoveLegal(currentPosition, destinationPositionIllegal, board));
    }

    @Test
    void isMoveLegalBlackNotFirstMove() {
        var currentPosition = new Position(5, 1);
        var pawn = new Pawn(PlayerColor.BLACK);
        pawn.setFirstMove(false);

        var destinationPositionIllegal = new Position(7, 2);
        assertFalse(pawn.isMoveLegal(currentPosition, destinationPositionIllegal, board));
    }

    @Test
    void isMoveLegalWhiteNotFirstMove() {
        var currentPosition = new Position(2, 1);
        var pawn = new Pawn(PlayerColor.WHITE);
        pawn.setFirstMove(false);

        var destinationPositionIllegal = new Position(0, 2);
        assertFalse(pawn.isMoveLegal(currentPosition, destinationPositionIllegal, board));
    }

    @Test
    void makeMoveEnPessant() {
        Pawn pawn = new Pawn(PlayerColor.BLACK);
        Position pawnPosition = new Position(0, 0);
        Position pawnDestination = new Position(1, 1);
        board.setBoardPosition(pawnPosition, pawn);

        Pawn pawnEnPassable = new Pawn(PlayerColor.WHITE);
        Position pawnEnPassablePosition = new Position(2, 1);
        Position destinationEnPassable = new Position(0, 1);
        board.setBoardPosition(pawnEnPassablePosition, pawnEnPassable);
        board.setEnPessantPosition(pawnEnPassablePosition);

        pawn.makeMove(pawnPosition, pawnDestination, board);

        assertNull(board.getPieceByPosition(destinationEnPassable));
    }

    @Test
    void isMoveLegalEnPassant() {
        Pawn pawn = new Pawn(PlayerColor.BLACK);
        Position pawnPosition = new Position(0, 0);
        board.setBoardPosition(pawnPosition, pawn);

        Pawn pawnEnPassable = new Pawn(PlayerColor.WHITE);
        Position pawnEnPassablePosition = new Position(2, 1);
        Position destinationEnPassable = new Position(0, 1);
        board.setBoardPosition(pawnEnPassablePosition, pawnEnPassable);

        pawnEnPassable.makeMove(pawnEnPassablePosition, destinationEnPassable, board);
        assertTrue(pawn.isMoveLegal(pawnPosition, new Position(1, 1), board));
    }
}