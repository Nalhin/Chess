package com.chess.gameservice.service;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.piece.Pawn;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.models.AvailableMoves;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class GameServiceTest {

    GameService gameService;
    UUID gameId = new UUID(8, 8);

    @BeforeEach
    void setUp() {
        gameService = new GameService();
        gameService.createGame(gameId);
    }

    @Test
    void createGame() {
        gameService.createGame(gameId);

        var position = new Position(1, 0);
        var positions = gameService.getAvailableMoves(gameId, position);

        assertNotNull(positions);
    }

    @Test
    void getAvailableMoves() {
        var pawnPosition = new Position(1, 7);
        var expectedMoves = new ArrayList<Position>();
        expectedMoves.add(new Position(2, 7));
        expectedMoves.add(new Position(3, 7));
        var expectedAvailableMoves = new AvailableMoves();
        expectedAvailableMoves.setAvailableMoves(expectedMoves);

        var availableMoves = gameService.getAvailableMoves(gameId, pawnPosition);

        assertEquals(expectedAvailableMoves, availableMoves);
    }

    @Test
    void move() {
        var initialPosition = new Position(1, 7);
        var destinationPosition = new Position(2, 7);

        var boardAfterMove = gameService.move(gameId, initialPosition, destinationPosition);

        assertNotEquals(new Board(), boardAfterMove);
        assertTrue(boardAfterMove.getBoard()[2][7] instanceof Pawn);
    }
}