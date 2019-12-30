package com.chess.queueservice.messages;

import com.chess.queueservice.messages.payloads.GameFoundPayload;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class GameFoundMessage extends Message<GameFoundPayload> {
    public GameFoundMessage(GameFoundPayload payload) {
        super(MessageTypes.QUEUE_GAME_FOUND, payload);
    }
}
