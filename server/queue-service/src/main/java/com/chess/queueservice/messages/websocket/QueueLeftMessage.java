package com.chess.queueservice.messages.websocket;

import com.chess.queueservice.messages.websocket.payload.QueueLeftPayload;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QueueLeftMessage extends Message<QueueLeftPayload>{
    public QueueLeftMessage(QueueLeftPayload payload) {
        super(MessageTypes.QUEUE_LEFT, payload);
    }
}
