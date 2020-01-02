package com.chess.gameservice.messages.socket;

import com.chess.gameservice.messages.payloads.AvailableMovesPayload;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public
class AvailableMovesMessage extends Message<AvailableMovesPayload> {

    public AvailableMovesMessage() {
        type = MessageTypes.AVAILABLE_MOVES;
    }
}
