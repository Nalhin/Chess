package com.chess.chatservice.messages;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage extends Message {
    public ChatMessage() {
        super(MessageTypes.CHAT_MESSAGE);
    }
}
