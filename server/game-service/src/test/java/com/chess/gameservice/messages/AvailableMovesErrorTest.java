package com.chess.gameservice.messages;

import com.chess.gameservice.moves.AvailableMovesError;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;

class AvailableMovesErrorTest {

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
    void testJsonConversion() throws JsonProcessingException, JSONException {
        var testError = "testError";
        var error = new AvailableMovesError();
        error.setError(testError);
        var errorMessage = new AvailableMovesErrorMessage();
        errorMessage.setPayload(error);
        var actual = objectMapper.writeValueAsString(errorMessage);
        var expected = "{type:\"" + MessageTypes.AVAILABLE_MOVES_ERROR + "\"," +
                "\"payload\":{error:\"" + testError + "\"}}";

        JSONAssert.assertEquals(expected, actual, true);
    }
}