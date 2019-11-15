package com.chess.gameservice.messages;

import com.chess.gameservice.availablemoves.AvailableMoves;
import com.chess.gameservice.game.position.Position;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;

import java.util.ArrayList;

class AvailableMovesMessageTest {

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
    void testJsonConversion() throws JsonProcessingException, JSONException {
        var x = 2;
        var y = 3;
        var position = new Position(x, y);
        var availableMoves = new AvailableMoves();
        var positions = new ArrayList<Position>();
        positions.add(position);
        availableMoves.setAvailableMoves(positions);
        var availableMovesMessage = new AvailableMovesMessage();
        availableMovesMessage.setPayload(availableMoves);

        var expected = "{type:\"" + MessageTypes.AVAILABLE_MOVES + "\"," +
                "\"payload\":{\"availableMoves\":[{\"x\":" + x + ",\"y\":" + y + "}]}}";
        var actual = objectMapper.writeValueAsString(availableMovesMessage);

        JSONAssert.assertEquals(expected, actual, true);
    }
}