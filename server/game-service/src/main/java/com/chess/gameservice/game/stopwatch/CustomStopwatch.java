package com.chess.gameservice.game.stopwatch;

import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.Instant;

@NoArgsConstructor
public class CustomStopwatch {
    private Instant startTime;


    public void start() {
        startTime = Instant.now();
    }

    public Duration end() {
        if (startTime == null) {
            return Duration.ZERO;
        }
        Instant ends = Instant.now();
        return Duration.between(startTime, ends);
    }
}
