package com.chess.gameservice.game.player;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PlayersTest {

    @Test
    void getPlayerByColor() {
        var blackPlayer = new Player("black");
        var whitePlayer = new Player("white");
        var players=new Players();
        players.put(PlayerColor.BLACK,blackPlayer);
        players.put(PlayerColor.WHITE,whitePlayer);

        assertEquals(blackPlayer,players.get(PlayerColor.BLACK));
        assertEquals(whitePlayer,players.get(PlayerColor.WHITE));
    }
}