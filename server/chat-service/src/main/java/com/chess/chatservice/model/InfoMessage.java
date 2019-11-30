package com.chess.chatservice.model;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InfoMessage extends Message{
    public InfoMessage() {
        type=MessageTypes.INFO_MESSAGE;
    }
}
