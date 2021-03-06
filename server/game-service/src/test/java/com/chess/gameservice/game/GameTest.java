package com.chess.gameservice.game;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.player.Player;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.messages.payloads.PlayerMovePayload;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class GameTest {

    private Game game;
    private Player firstPlayer;
    private Player secondPlayer;
    private final String firstPlayerName = "firstPlayerName";
    private final String secondPlayerName = "secondPlayerName";

    @BeforeEach
    void setUp() {
        game = new Game();
        firstPlayer = new Player(firstPlayerName);
        secondPlayer = new Player(secondPlayerName);
    }

    @Test
    void initGame() {
        game.setPlayer(firstPlayer, PlayerColor.WHITE);
        game.setPlayer(secondPlayer, PlayerColor.BLACK);

        game.initGame(UUID.randomUUID());

        assertEquals(GamePhase.STARTED, game.getGamePhase());
        assertEquals(PlayerColor.WHITE, game.getCurrentTurn().getCurrentPlayerColor());
    }

    @Test
    void makeMove() throws GameException {
        game.setPlayer(firstPlayer, PlayerColor.WHITE);
        game.setPlayer(secondPlayer, PlayerColor.BLACK);
        var playerMove = new PlayerMovePayload(new Position(6, 1), new Position(5, 1));

        game.initGame(UUID.randomUUID());
        game.makeMove(playerMove, firstPlayer);

        assertEquals(game.getCurrentTurn().getCurrentPlayerColor(), PlayerColor.BLACK);
    }

    @Test
    void makeMoveShouldThrowErrorIfNotPlayerTurn() {
        game.setPlayer(firstPlayer, PlayerColor.WHITE);
        game.setPlayer(secondPlayer, PlayerColor.BLACK);
        var playerMove = new PlayerMovePayload(new Position(1, 0), new Position(2, 0));

        game.initGame(UUID.randomUUID());

        assertThrows(GameException.class, () -> game.makeMove(playerMove, secondPlayer));
    }

    @Test
    void getAvailableMoves() throws GameException {
        game.setPlayer(firstPlayer, PlayerColor.WHITE);
        game.setPlayer(secondPlayer, PlayerColor.BLACK);
        var position = new Position(6, 1);
        var expectedMoves = new ArrayList<Position>();
        expectedMoves.add(new Position(5, 1));
        expectedMoves.add(new Position(4, 1));

        game.initGame(UUID.randomUUID());
        var actualMoves = game.getAvailableMoves(position, firstPlayer);

        assertEquals(expectedMoves, actualMoves);
    }


    @Test
    void getAvailableMovesShouldThrowErrorIfNotPlayerTurn() {
        game.setPlayer(firstPlayer, PlayerColor.WHITE);
        game.setPlayer(secondPlayer, PlayerColor.BLACK);
        var position = new Position(6, 1);

        game.initGame(UUID.randomUUID());

        assertThrows(GameException.class, () -> game.getAvailableMoves(position, secondPlayer));
    }

}