package com.chess.gameservice.messages;

import com.chess.gameservice.models.QueueUserCount;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QueueUserCountMessage extends Message<QueueUserCount> {
    public QueueUserCountMessage() {
        type = MessageTypes.PLAYER_MOVED;
    }
}
