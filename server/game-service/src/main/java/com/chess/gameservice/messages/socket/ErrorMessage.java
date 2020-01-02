package com.chess.gameservice.messages.socket;

import com.chess.gameservice.messages.payloads.ErrorPayload;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public
class ErrorMessage extends Message<ErrorPayload> {

    public ErrorMessage() {
        type = MessageTypes.ERROR;
    }
}
