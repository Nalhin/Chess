package com.chess.gameservice.game;

import com.chess.gameservice.game.player.Player;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.moves.PlayerMove;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GameTest {

    @BeforeEach
    void setUp() {
    }

    @Test
    void initGame() {
        var game = new Game();

        var testName = "testname";
        var player = new Player(testName);
        game.setPlayer(player,PlayerColor.WHITE);
        game.setPlayer(player,PlayerColor.BLACK);

        game.initGame();

        assertEquals(Game.GamePhase.STARTED, game.gamePhase);
        assertEquals(PlayerColor.WHITE, game.getCurrentTurn());
    }

    @Test
    void makeMove(){
        var game = new Game();

        var testName = "testname";
        var player = new Player(testName);
        game.setPlayer(player,PlayerColor.WHITE);
        game.setPlayer(player,PlayerColor.BLACK);

        game.initGame();

        game.makeMove(new PlayerMove(new Position(6,1),new Position(5,1)),game.getPlayers().getWhitePlayer());

        assertEquals(game.getCurrentTurn(),PlayerColor.BLACK);
    }
}