package com.chess.gameservice.game.stopwatch;

import com.chess.gameservice.messages.events.PlayerOutOfTimeEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class CustomSpringEventPublisher {

    private static ApplicationEventPublisher applicationEventPublisher;

    public CustomSpringEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
        CustomSpringEventPublisher.applicationEventPublisher = applicationEventPublisher;
    }

    public static void publishPlayerOutOfTime(UUID gameId, String name) {
        PlayerOutOfTimeEvent customSpringEvent = new PlayerOutOfTimeEvent(gameId, gameId, name);
        applicationEventPublisher.publishEvent(customSpringEvent);
    }
}
