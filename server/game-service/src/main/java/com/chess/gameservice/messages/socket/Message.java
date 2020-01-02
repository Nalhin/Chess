package com.chess.gameservice.messages.socket;


import lombok.Data;

@Data
abstract class Message<T> {
    MessageTypes type;
    T payload;
}
