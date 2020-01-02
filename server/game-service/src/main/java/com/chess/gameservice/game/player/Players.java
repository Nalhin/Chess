package com.chess.gameservice.game.player;

import lombok.Getter;
import lombok.Setter;

import java.util.EnumMap;

@Getter
@Setter
public class Players extends EnumMap<PlayerColor, Player> {

    public Players() {
        super(PlayerColor.class);
    }

    public void changeTurn(PlayerColor currentTurn) {
        this.get(currentTurn);
        this.get(currentTurn).endTurn();
        this.get(PlayerColor.getOtherColor(currentTurn)).startTurn();
    }
}
