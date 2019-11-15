package com.chess.gameservice.messages;

import com.chess.gameservice.game.Game;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;

class PlayedMovedMessageTest {
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
    void testJsonConversion() throws JsonProcessingException, JSONException {
        var game = new Game();
        var playedMovedMessage = new PlayedMovedMessage();
        playedMovedMessage.setPayload(game);

        var actual = objectMapper.writeValueAsString(playedMovedMessage);
        var partialExpected = "{type:\"" + MessageTypes.PLAYER_MOVED + "\"}";

        JSONAssert.assertEquals(partialExpected, actual, false);
    }
}