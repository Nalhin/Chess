package com.chess.queueservice.messages.websocket;

import com.chess.queueservice.messages.websocket.payload.ErrorPayload;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorMessage extends Message<ErrorPayload> {
    public ErrorMessage(ErrorPayload payload) {
        super(MessageTypes.QUEUE_ERROR, payload);
    }
}
