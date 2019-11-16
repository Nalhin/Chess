package com.chess.gameservice.game;

import com.chess.gameservice.game.player.Player;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class GameTest {

    @BeforeEach
    void setUp() {
    }

    @Test
    void setRandomPlayer() {
        var testName = "testname";
        var game = new Game();
        var player = new Player(testName);

        game.setRandomPlayer(player);

        var players = game.players;
        assertTrue(players.getWhitePlayer().equals(player) || players.getBlackPlayer().equals(player));
    }

    @Test
    void initGame() {
        var game = new Game();

        var testName = "testname";
        var player = new Player(testName);
        game.setRandomPlayer(player);
        game.setOtherPlayer(player);

        game.initGame();

        assertEquals(Game.GameState.STARTED, game.gameState);
        assertEquals(player, game.getCurrentTurn());
    }
}