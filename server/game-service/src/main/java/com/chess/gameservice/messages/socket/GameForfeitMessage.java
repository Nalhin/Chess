package com.chess.gameservice.messages.socket;

import com.chess.gameservice.messages.payloads.GameForfeitPayload;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameForfeitMessage extends Message<GameForfeitPayload>{
    public GameForfeitMessage() {
        type = MessageTypes.GAME_FORFEIT;
    }
}
