package com.chess.chatservice.messages;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
abstract class Message {

    protected Message(MessageTypes type) {
        this.type = type;
    }

    private String content;
    private String sendDate;
    private MessageTypes type;
    private String id;
    private String sender;
}
