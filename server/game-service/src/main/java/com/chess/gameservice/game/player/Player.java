package com.chess.gameservice.game.player;

import com.chess.gameservice.game.stopwatch.CustomStopwatch;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Duration;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties("player_GAME_TIME")
public class Player {

    @JsonIgnore
    private CustomStopwatch playerStopwatch;

    @JsonIgnore
    private final int PLAYER_GAME_TIME = 20;

    private Duration totalTurnTimeRemaining = Duration.ofSeconds(PLAYER_GAME_TIME);

    String name;


    @JsonIgnore
    public Duration getTotalElapsedTime() {
        return Duration.ofSeconds(PLAYER_GAME_TIME).minus(totalTurnTimeRemaining);
    }

    public Player(String name) {
        this.name = name;
        this.playerStopwatch = new CustomStopwatch();
    }

    public void startTurn(UUID gameId) {
        playerStopwatch.start(totalTurnTimeRemaining, gameId,name);
    }

    public void endTurn() {
        Duration turnDuration = playerStopwatch.end();
        setTotalTurnTimeRemaining(totalTurnTimeRemaining.minus(turnDuration));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Player player = (Player) o;
        return name.equals(player.name);
    }
}
