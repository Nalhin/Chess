package com.chess.gameservice.game.board;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.piece.*;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CheckCheckerTest {

    Board board;

    @BeforeEach
    void setUp() {
        board = new Board();
    }

    @Test
    void isSquareThreatenedTest() throws GameException {
        board.setBoardPosition(new Position(1, 5), null);
        board.setBoardPosition(new Position(3, 7), PieceFactory.buildPiece(PieceType.QUEEN, PlayerColor.WHITE));
        Position threatenedPosition = board.getKingPosition(PlayerColor.BLACK);

        assertTrue(CheckChecker.isSquareThreatened(board, threatenedPosition, PlayerColor.BLACK));
    }

    @Test
    void isSquareThreatenedKnightTest() {
        board.setBoardPosition(new Position(2, 3), PieceFactory.buildPiece(PieceType.KNIGHT, PlayerColor.WHITE));
        Position threatenedPosition = board.getKingPosition(PlayerColor.BLACK);

        assertTrue(CheckChecker.isSquareThreatened(board, threatenedPosition, PlayerColor.BLACK));
    }

    @Test
    void getCheckStateCheckMateTest() {
        board.setBoardPosition(new Position(1, 5), null);
        board.setBoardPosition(new Position(1, 6), null);
        board.setBoardPosition(new Position(3, 7), PieceFactory.buildPiece(PieceType.QUEEN, PlayerColor.WHITE));

        assertEquals(CheckState.CHECK_MATE, CheckChecker.getCheckState(board, PlayerColor.BLACK));
    }
}