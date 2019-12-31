package com.chess.gameservice.game.player;

import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.Instant;

@NoArgsConstructor
public class PlayerStopwatch {
    private Instant startTime;


    void start() {
        startTime = Instant.now();
    }

    Duration end() {
        if (startTime == null) {
            return Duration.ZERO;
        }
        Instant ends = Instant.now();
        return Duration.between(startTime, ends);
    }
}
