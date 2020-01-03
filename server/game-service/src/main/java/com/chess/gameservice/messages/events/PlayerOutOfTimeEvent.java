package com.chess.gameservice.messages.events;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

import java.util.UUID;

@Getter
@Setter
public class PlayerOutOfTimeEvent extends ApplicationEvent {

    private UUID gameId;
    private String name;

    public PlayerOutOfTimeEvent(Object source,UUID gameId,String name) {
        super(source);
        this.gameId=gameId;
        this.name=name;
    }
}
