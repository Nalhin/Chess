package com.chess.queueservice.messages.websocket;

import com.chess.queueservice.messages.websocket.payload.GameFoundPayload;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class GameFoundMessage extends Message<GameFoundPayload> {
    public GameFoundMessage(GameFoundPayload payload) {
        super(MessageTypes.QUEUE_GAME_FOUND, payload);
    }
}
