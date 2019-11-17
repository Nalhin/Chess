package com.chess.gameservice.service;

import com.chess.gameservice.game.Game;
import com.chess.gameservice.game.piece.Pawn;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.moves.AvailableMoves;
import com.chess.gameservice.moves.PlayerMove;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class GameServiceTest {

    private GameService gameService;
    private UUID gameId = new UUID(8, 8);
    private String firstPlayerName = "firstPlayer";
    private String secondPlayerName = "secondPlayer";

    @BeforeEach
    void setUp() {
        gameService = new GameService();
    }

    @Test
    void initialConnect() {
        Game game = gameService.initialConnect(gameId, firstPlayerName);

        assertNull(game);

        game = gameService.initialConnect(gameId, secondPlayerName);

        assertNotNull(game);
        assertNotNull(game.getPlayers().getBlackPlayer());
        assertNotNull(game.getPlayers().getWhitePlayer());
    }

    @Test
    void getAvailableMoves() {
        gameService.initialConnect(gameId, firstPlayerName);
        gameService.initialConnect(gameId, secondPlayerName);

        var pawnPosition = new Position(1, 7);
        var expectedMoves = new ArrayList<Position>();
        expectedMoves.add(new Position(2, 7));
        expectedMoves.add(new Position(3, 7));
        var expectedAvailableMoves = new AvailableMoves();
        expectedAvailableMoves.setPosition(pawnPosition);
        expectedAvailableMoves.setAvailableMoves(expectedMoves);

        var availableMoves = gameService.getAvailableMoves(gameId, pawnPosition);

        assertEquals(expectedAvailableMoves, availableMoves);
    }

    @Test
    void move() {
        gameService.initialConnect(gameId, firstPlayerName);
        gameService.initialConnect(gameId, secondPlayerName);
        var initialPosition = new Position(1, 7);
        var destinationPosition = new Position(2, 7);
        var playerMove = new PlayerMove(initialPosition, destinationPosition);

        var gameAfterMove = gameService.makeMove(gameId, playerMove, firstPlayerName);

        assertTrue(gameAfterMove.getBoard().getState()[2][7] instanceof Pawn);
    }
}