package com.chess.gameservice.messages.events;

import com.chess.gameservice.game.Game;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class GameOverEvent extends ApplicationEvent {
    private Game game;

    public GameOverEvent(Object source, Game game) {
        super(source);
        this.game=game;
    }
}
