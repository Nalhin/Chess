package com.chess.gameservice.game.piece;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

public enum PieceType {
    PAWN(1), KNIGHT(2), BISHOP(3), ROOK(4), QUEEN(5), KING(6);

    PieceType(int type) {
        value = type;
    }

    public final int value;


    @JsonValue
    int toValue() {
        return value;
    }

    @JsonCreator
    static PieceType fromValue(int value) {
        return Arrays.stream(PieceType .values()).filter(e -> e.value == value).findFirst().get();

    }
}
