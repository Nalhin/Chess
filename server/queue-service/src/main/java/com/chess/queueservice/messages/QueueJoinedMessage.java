package com.chess.queueservice.messages;

import com.chess.queueservice.messages.payloads.GameFoundPayload;
import com.chess.queueservice.messages.payloads.QueueJoinedMessagePayload;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QueueJoinedMessage extends Message<QueueJoinedMessagePayload>{
    public QueueJoinedMessage(QueueJoinedMessagePayload payload) {
        super(MessageTypes.QUEUE_JOINED, payload);
    }

}
