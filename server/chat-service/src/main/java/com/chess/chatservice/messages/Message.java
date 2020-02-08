package com.chess.chatservice.messages;


import lombok.Data;

@Data
abstract class Message {
    String content;
    String sendDate;
    MessageTypes type;
    String id;
}
