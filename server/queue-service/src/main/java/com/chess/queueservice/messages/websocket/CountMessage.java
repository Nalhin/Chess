package com.chess.queueservice.messages.websocket;

import com.chess.queueservice.messages.websocket.payload.CountPayload;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CountMessage extends Message<CountPayload> {
    public CountMessage(CountPayload payload) {
        super(MessageTypes.QUEUE_COUNT, payload);
    }
}
