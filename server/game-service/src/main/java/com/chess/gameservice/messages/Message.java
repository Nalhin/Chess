package com.chess.gameservice.messages;

import lombok.Data;

@Data
abstract class Message<T> {
    MessageTypes type;
    T payload;
}
