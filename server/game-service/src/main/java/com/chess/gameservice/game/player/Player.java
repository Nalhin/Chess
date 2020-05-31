package com.chess.gameservice.game.player;

import com.chess.gameservice.game.stopwatch.CustomStopwatch;
import com.chess.gameservice.utils.IsoDate;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Duration;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties("player_GAME_TIME")
public class Player {

    @JsonIgnore
    private CustomStopwatch playerStopwatch;

    @JsonIgnore
    private final int PLAYER_GAME_TIME = 300;

    private Duration totalTurnTimeRemaining = Duration.ofSeconds(PLAYER_GAME_TIME);
    private String turnStartDate;
    private String name;


    @JsonIgnore
    public Duration getTotalElapsedTime() {
        return Duration.ofSeconds(PLAYER_GAME_TIME).minus(totalTurnTimeRemaining);
    }

    public Player(String name) {
        this.name = name;
        this.playerStopwatch = new CustomStopwatch();
    }

    public void startTurn(UUID gameId) {
        playerStopwatch.start(totalTurnTimeRemaining, gameId, name);
        turnStartDate = IsoDate.getCurrentIsoDate();
    }

    public void endTurn() {
        turnStartDate = null;
        Duration turnDuration = playerStopwatch.end();
        setTotalTurnTimeRemaining(totalTurnTimeRemaining.minus(turnDuration));
    }

    public void forceClose() {
        playerStopwatch.end();
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Player player = (Player) o;
        return name.equals(player.name);
    }
}
