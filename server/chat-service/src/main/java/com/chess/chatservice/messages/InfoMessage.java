package com.chess.chatservice.messages;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InfoMessage extends Message {
    public InfoMessage() {
        type= MessageTypes.INFO_MESSAGE;
    }
}
