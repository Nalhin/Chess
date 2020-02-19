package com.chess.gameservice.game.turn;

import com.chess.gameservice.game.player.PlayerColor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CurrentTurn {
    private PlayerColor currentPlayerColor;
    private int turnNumber;

    public CurrentTurn() {
        currentPlayerColor = PlayerColor.WHITE;
        turnNumber = 0;
    }

    public void changeTurn() {
        turnNumber++;
        setCurrentPlayerColor(PlayerColor.getOtherColor(currentPlayerColor));
    }

    public void changeTurnWithoutIncrementingTurnNumber(){
        setCurrentPlayerColor(PlayerColor.getOtherColor(currentPlayerColor));
    }
}
