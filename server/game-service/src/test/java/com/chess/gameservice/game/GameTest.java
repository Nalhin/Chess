package com.chess.gameservice.game;

import com.chess.gameservice.game.player.Player;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.moves.PlayerMove;
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

        assertEquals(Game.GamePhase.STARTED, game.gamePhase);
        assertEquals(PlayerColor.WHITE, game.getCurrentTurn());
    }

    @Test
    void makeMove(){
        var game = new Game();

        var testName = "testname";
        var player = new Player(testName);
        game.setRandomPlayer(player);
        game.setOtherPlayer(player);

        game.initGame();

        game.makeMove(new PlayerMove(new Position(1,1),new Position(2,1)),game.getPlayers().getWhitePlayer());

        assertEquals(game.getCurrentTurn(),PlayerColor.BLACK);
    }
}