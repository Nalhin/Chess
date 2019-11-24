package com.chess.chatservice.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage extends Message {
    private String name;

    public ChatMessage() {
        type = MessageTypes.CHAT_MESSAGE;
    }
}
