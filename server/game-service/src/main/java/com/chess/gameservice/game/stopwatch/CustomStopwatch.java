package com.chess.gameservice.game.stopwatch;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.Timer;
import java.util.TimerTask;
import java.util.UUID;

@Getter
@Setter
@Component
public class CustomStopwatch {
    private Instant startTime;
    private Timer timer;
    private TimerTask task;

    public void start(Duration totalTurnTimeRemaining, UUID gameId,String name) {
        timer = new Timer();
        task = new TimerTask() {
            @Override
            public void run() {
                StopwatchEventPublisher.publishPlayerOutOfTime(gameId,name);
            }
        };

        startTime = Instant.now();
        timer.schedule(task, totalTurnTimeRemaining.toMillis());
    }

    public Duration end() {

        if(task!=null && timer!=null){
            task.cancel();
            timer.cancel();
        }

        if (startTime == null) {
            return Duration.ZERO;
        }


        Instant ends = Instant.now();
        System.out.println(Duration.between(startTime, ends));
        return Duration.between(startTime, ends);
    }

}
