package com.chess.gameservice.messages.socket;

import com.chess.gameservice.game.Game;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;

class GameOverMessageTest {

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
    void testJsonConversion() throws JsonProcessingException, JSONException {
        var game = new Game();
        var gameOverMessage = new GameOverMessage();
        gameOverMessage.setPayload(game);

        var actual = objectMapper.writeValueAsString(gameOverMessage);
        var partialExpected = "{type:\"" + MessageTypes.GAME_OVER + "\"}";

        JSONAssert.assertEquals(partialExpected, actual, false);
    }
}