package com.chess.gameservice.game.player;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Players {
    private Player whitePlayer;
    private Player blackPlayer;

    public void setPlayerByColor(Player player,PlayerColor playerColor){
        switch (playerColor){
            case WHITE:
                 whitePlayer=player;
            case BLACK:
                 blackPlayer=player;
        }
    }

    public Player getPlayerByColor(PlayerColor playerColor){
        switch (playerColor){
            case WHITE:
                return whitePlayer;
            case BLACK:
                return blackPlayer;
            default:
                return null;
        }
    }
}
