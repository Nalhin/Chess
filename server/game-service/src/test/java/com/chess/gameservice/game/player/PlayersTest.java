package com.chess.gameservice.game.player;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PlayersTest {

    @Test
    void getPlayerByColor() {
        var blackPlayer = new Player("black");
        var whitePlayer = new Player("white");
        var players=new Players();
        players.setBlackPlayer(blackPlayer);
        players.setWhitePlayer(whitePlayer);

        assertEquals(blackPlayer,players.getPlayerByColor(PlayerColor.BLACK));
        assertEquals(whitePlayer,players.getPlayerByColor(PlayerColor.WHITE));
    }
}