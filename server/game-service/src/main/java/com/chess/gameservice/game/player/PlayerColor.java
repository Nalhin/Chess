package com.chess.gameservice.game.player;

public enum PlayerColor {
    WHITE(0), BLACK(1);

    PlayerColor (int type) {
        value = type;
    }

    public final int value;
}
