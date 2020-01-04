package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.awt.*;
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
    void getAvailableMovesCastlingTest() {
        Position kingPosition = new Position(0, 4);
        King king = new King(PlayerColor.WHITE);
        Piece[][] testBoard = new Piece[8][8];
        testBoard[0][0] = new Rook(PlayerColor.WHITE);
        testBoard[0][7] = new Rook(PlayerColor.WHITE);
        testBoard[0][4] = king;
        board.setState(testBoard);
        ArrayList<Position> expectedAvailableMoves = new ArrayList<>();
        expectedAvailableMoves.add(new Position(0, 2));
        expectedAvailableMoves.add(new Position(0, 6));
        board.setKingPosition(PlayerColor.WHITE,kingPosition);

        ArrayList<Position> availableMoves = king.getAvailableMoves(board, kingPosition);

        assertTrue(availableMoves.containsAll(expectedAvailableMoves));
    }
    @Test
    void getAvailableMovesCastlingBlockedTest(){
        Position kingPosition = new Position(0, 4);
        King king = new King(PlayerColor.WHITE);
        Piece[][] testBoard = new Piece[8][8];
        testBoard[0][0] = new Rook(PlayerColor.WHITE);
        testBoard[0][7] = new Rook(PlayerColor.WHITE);
        testBoard[0][5] = new Rook(PlayerColor.WHITE);
        testBoard[0][4] = king;
        board.setState(testBoard);
        board.setKingPosition(PlayerColor.WHITE,kingPosition);

        ArrayList<Position> expectedAvailableMoves = new ArrayList<>();
        expectedAvailableMoves.add(new Position(0, 2));

        ArrayList<Position> availableMoves = king.getAvailableMoves(board, kingPosition);

        assertTrue(availableMoves.containsAll(expectedAvailableMoves));
    }

    @Test
    void isMoveLegal() {
        Position currentPosition = new Position(0, 1);
        King king = new King(PlayerColor.BLACK);

        Position destinationPositionLegal = new Position(1, 1);
        assertTrue(king.isMoveLegal(currentPosition, destinationPositionLegal, board));

        Position destinationPositionIllegal = new Position(2, 1);
        assertFalse(king.isMoveLegal(currentPosition, destinationPositionIllegal, board));

    }
    @Test
    void isCastlingMoveLegal(){
        Position kingPosition = new Position(0, 4);
        King king = new King(PlayerColor.WHITE);
        Piece[][] testBoard = new Piece[8][8];
        testBoard[0][0] = new Rook(PlayerColor.WHITE);
        testBoard[0][7] = new Rook(PlayerColor.WHITE);
        testBoard[0][5] = new Rook(PlayerColor.WHITE);
        testBoard[0][4] = king;
        board.setState(testBoard);
        board.setKingPosition(PlayerColor.WHITE,kingPosition);

        Position illegalCastlingMove = new Position(0, 6);

        assertFalse(king.isMoveLegal(kingPosition,illegalCastlingMove,board));

        Position legalCastlingMove = new Position(0, 2);

        assertTrue(king.isMoveLegal(kingPosition,legalCastlingMove,board));
    }

}