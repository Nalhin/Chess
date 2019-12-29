package com.chess.gameservice.messages;


import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
abstract class Message<T> {
    MessageTypes type;
    T payload;
}
