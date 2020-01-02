package com.chess.gameservice.messages.socket;

import com.chess.gameservice.messages.socket.ErrorMessage;
import com.chess.gameservice.messages.socket.MessageTypes;
import com.chess.gameservice.messages.payloads.ErrorPayload;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;

class ErrorPayloadMessageTest {

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
    void testJsonConversion() throws JsonProcessingException, JSONException {
        var testError = "testError";
        var error = new ErrorPayload();
        error.setError(testError);
        var errorMessage = new ErrorMessage();
        errorMessage.setPayload(error);
        var actual = objectMapper.writeValueAsString(errorMessage);
        var expected = "{type:\"" + MessageTypes.ERROR + "\"," +
                "\"payload\":{error:\"" + testError + "\"}}";

        JSONAssert.assertEquals(expected, actual, true);
    }
}