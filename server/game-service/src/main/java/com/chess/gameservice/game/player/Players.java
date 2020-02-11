package com.chess.gameservice.game.player;

import com.chess.gameservice.game.turn.CurrentTurn;
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
        if (get(currentTurnColor).getName().equals(playerName)) {
            this.get(currentTurnColor).endTurn();
            return currentTurnColor;
        }
        this.get(PlayerColor.getOtherColor(currentTurnColor)).endTurn();
        return PlayerColor.getOtherColor(currentTurnColor);
    }

    @JsonIgnore
    public Duration getGameDuration() {
        return Arrays.stream(PlayerColor.values())
                .map(this::get)
                .map(Player::getTotalElapsedTime)
                .reduce(Duration::plus).orElseThrow();
    }
}
