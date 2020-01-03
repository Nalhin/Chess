package com.chess.gameservice.game.player;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PlayersTest {
    private Players players;

    @BeforeEach
    void setUp() {
        players = new Players();
    }

    @Test
    void getPlayerByColor() {
        Player blackPlayer = new Player("black");
        Player whitePlayer = new Player("white");
        players.put(PlayerColor.BLACK, blackPlayer);
        players.put(PlayerColor.WHITE, whitePlayer);

        assertEquals(blackPlayer, players.get(PlayerColor.BLACK));
        assertEquals(whitePlayer, players.get(PlayerColor.WHITE));
    }

    @Test
    void changeTurn() throws InterruptedException {

    }

    @Test
    void getGameDuration() throws InterruptedException {
        Player blackPlayer = new Player("black");
        Player whitePlayer = new Player("white");
        players.put(PlayerColor.BLACK, blackPlayer);
        players.put(PlayerColor.WHITE, whitePlayer);

        UUID uuid = UUID.randomUUID();

        players.changeTurn(PlayerColor.BLACK, uuid);
        players.changeTurn(PlayerColor.WHITE,uuid);
        Thread.sleep(1000);
        players.changeTurn(PlayerColor.BLACK,uuid);
        Duration dur = players.getGameDuration();
        assertTrue(dur.getSeconds() >= 1);
    }
}