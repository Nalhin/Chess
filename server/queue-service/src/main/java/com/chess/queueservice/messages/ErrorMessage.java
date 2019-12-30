package com.chess.queueservice.messages;

import com.chess.queueservice.messages.payloads.ErrorPayload;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorMessage extends Message<ErrorPayload> {
    public ErrorMessage(ErrorPayload payload) {
        super(MessageTypes.QUEUE_GAME_FOUND, payload);
    }
}
