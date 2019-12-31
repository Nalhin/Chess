package com.chess.queueservice.messages;

import com.chess.queueservice.messages.payloads.CountPayload;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CountMessage extends Message<CountPayload> {
    public CountMessage(CountPayload payload) {
        super(MessageTypes.QUEUE_COUNT, payload);
    }
}
