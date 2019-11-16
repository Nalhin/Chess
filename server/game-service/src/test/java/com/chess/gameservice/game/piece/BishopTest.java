package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class BishopTest {
    private Board board;

    @BeforeEach
    void setUp() {
        var testBoard = new Piece[8][8];
        board = new Board();
        board.setState(testBoard);
    }

    @Test
    void getAvailableMoves() {
        var bishop = new Bishop(PlayerColor.BLACK);
        var bishopPosition = new Position(4, 3);
        var expectedMoves = new ArrayList<Position>();
        int[] positionsX = {5, 6, 7, 3, 2, 1, 0, 3, 2, 1, 5, 6, 7};
        int[] positionsY = {4, 5, 6, 4, 5, 6, 7, 2, 1, 0, 2, 1, 0};
        for (int i = 0; i < positionsX.length; i++) {
            expectedMoves.add(new Position(positionsX[i], positionsY[i]));
        }

        var availableMoves = bishop.getAvailableMoves(board, bishopPosition);

        assertArrayEquals(expectedMoves.toArray(), availableMoves.toArray());
    }

    @Test
    void getAvailableMovesPathBlocked() {
        var boardWithPathBlocked = board.getState();
        boardWithPathBlocked[6][5] = new Bishop(PlayerColor.BLACK);
        boardWithPathBlocked[2][1] = new Bishop(PlayerColor.BLACK);
        boardWithPathBlocked[7][0] = new Bishop(PlayerColor.BLACK);
        board.setState(boardWithPathBlocked);

        var bishop = new Bishop(PlayerColor.BLACK);
        var bishopPosition = new Position(4, 3);
        var expectedMoves = new ArrayList<Position>();
        int[] positionsX = {5, 3, 2, 1, 0, 3, 5, 6};
        int[] positionsY = {4, 4, 5, 6, 7, 2, 2, 1};
        for (int i = 0; i < positionsX.length; i++) {
            expectedMoves.add(new Position(positionsX[i], positionsY[i]));
        }

        var availableMoves = bishop.getAvailableMoves(board, bishopPosition);

        assertArrayEquals(expectedMoves.toArray(), availableMoves.toArray());
    }


    @Test
    void isMoveLegal() {
        var currentPosition = new Position(4, 1);
        var bishop = new Bishop(PlayerColor.BLACK);

        var destinationPositionLegal = new Position(6, 3);
        assertTrue(bishop.isMoveLegal(currentPosition, destinationPositionLegal, board));

        var destinationPositionIllegal = new Position(7, 3);
        assertFalse(bishop.isMoveLegal(currentPosition, destinationPositionIllegal, board));

        var destinationPositionOutOfBounds = new Position(8, 5);
        assertFalse(bishop.isMoveLegal(currentPosition, destinationPositionOutOfBounds, board));
    }
}