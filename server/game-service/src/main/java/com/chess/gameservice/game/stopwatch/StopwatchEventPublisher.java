package com.chess.gameservice.game.stopwatch;

import com.chess.gameservice.messages.events.PlayerOutOfTimeEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class StopwatchEventPublisher {

    private static ApplicationEventPublisher applicationEventPublisher;

    public StopwatchEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
        StopwatchEventPublisher.applicationEventPublisher = applicationEventPublisher;
    }

    public static void publishPlayerOutOfTime(UUID gameId, String name) {
        PlayerOutOfTimeEvent customSpringEvent = new PlayerOutOfTimeEvent(gameId, gameId, name);
        applicationEventPublisher.publishEvent(customSpringEvent);
    }
}
