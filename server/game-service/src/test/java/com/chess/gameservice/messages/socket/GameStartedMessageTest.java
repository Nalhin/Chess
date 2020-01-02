package com.chess.gameservice.messages.socket;

import com.chess.gameservice.game.Game;
import com.chess.gameservice.messages.socket.GameStartedMessage;
import com.chess.gameservice.messages.socket.MessageTypes;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;

class GameStartedMessageTest {

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
    void testJsonConversion() throws JsonProcessingException, JSONException {
        var game = new Game();
        var gameStartedMessage = new GameStartedMessage();
        gameStartedMessage.setPayload(game);

        var actual = objectMapper.writeValueAsString(gameStartedMessage);
        var partialExpected = "{type:\"" + MessageTypes.GAME_STARTED + "\"}";

        JSONAssert.assertEquals(partialExpected, actual, false);
    }
}