package com.chess.queueservice.messages.websocket;

import com.chess.queueservice.messages.websocket.payload.QueueJoinedMessagePayload;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QueueJoinedMessage extends Message<QueueJoinedMessagePayload> {
    public QueueJoinedMessage(QueueJoinedMessagePayload payload) {
        super(MessageTypes.QUEUE_JOINED, payload);
    }

}
