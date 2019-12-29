package com.chess.gameservice.messages;

import com.chess.gameservice.models.ErrorPayload;
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
