package com.chess.gameservice.game.player;

import com.fasterxml.jackson.annotation.JsonValue;

import java.io.Serializable;


public enum PlayerColor implements Serializable {
    WHITE(0), BLACK(1);

    PlayerColor(int type) {
        value = type;
    }

    public final int value;

    @JsonValue
    int toValue() {
        return value;
    }

    public static PlayerColor getOtherColor(PlayerColor playerColor) {
        switch (playerColor) {
            case WHITE:
                return BLACK;
            case BLACK:
                return WHITE;
            default:
                throw new IllegalArgumentException("Wrong color");
        }
    }
}
