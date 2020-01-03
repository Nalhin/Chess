package com.chess.gameservice.game.turn;

import com.chess.gameservice.game.player.PlayerColor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CurrentTurn {
    private PlayerColor currentPlayerColor = PlayerColor.WHITE;
    private int turnNumber = 0;


    public void changeTurn() {
        turnNumber++;
        setCurrentPlayerColor(PlayerColor.getOtherColor(currentPlayerColor));
    }

    public void changeTurnWithoutIncrementingTurnNumber(){
        setCurrentPlayerColor(PlayerColor.getOtherColor(currentPlayerColor));
    }
}
