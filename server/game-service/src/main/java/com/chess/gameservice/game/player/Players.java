package com.chess.gameservice.game.player;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.util.Arrays;
import java.util.EnumMap;
import java.util.UUID;

@Getter
@Setter
public class Players extends EnumMap<PlayerColor, Player> {

    public Players() {
        super(PlayerColor.class);
    }

    public void changeTurn(PlayerColor currentTurn, UUID gameId) {
        this.get(currentTurn);
        this.get(currentTurn).endTurn();
        this.get(PlayerColor.getOtherColor(currentTurn)).startTurn(gameId);
    }

    public PlayerColor forfeitAndGetWinner(PlayerColor currentTurnColor, String playerName) {
        this.get(currentTurnColor).endTurn();
        if (get(currentTurnColor).getName().equals(playerName)) {
            return currentTurnColor;
        }
        return PlayerColor.getOtherColor(currentTurnColor);
    }

    public void beforeDestroy() {
        this.get(PlayerColor.BLACK).forceClose();
        this.get(PlayerColor.WHITE).forceClose();
    }

    @JsonIgnore
    public Duration getGameDuration() {
        return Arrays.stream(PlayerColor.values())
                .map(this::get)
                .map(Player::getTotalElapsedTime)
                .reduce(Duration::plus).orElseThrow();
    }
}
