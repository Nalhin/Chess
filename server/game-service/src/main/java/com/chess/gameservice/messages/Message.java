package com.chess.gameservice.messages;

import lombok.Data;

@Data
public abstract class Message<T> {
    MessageTypes type;
    T payload;
}
