package com.chess.gameservice.game.player;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

public enum PlayerColor {
    WHITE(0), BLACK(1);

    PlayerColor(int type) {
        value = type;
    }

    public final int value;

    @JsonValue
    int toValue() {
        return value;
    }

    @JsonCreator
    static PlayerColor fromValue(int value) {
        return Arrays.stream(PlayerColor.values()).filter(e -> e.value == value).findFirst().get();
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
