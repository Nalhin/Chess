package com.chess.gameservice.game.position;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PositionTest {

    @Test
    void isWithinBounds() {
        var positionOverX = new Position(9, 7);
        assertFalse(positionOverX.isWithinBounds());

        var positionUnderX = new Position(-1, 7);
        assertFalse(positionUnderX.isWithinBounds());

        var positionOverY = new Position(2, 9);
        assertFalse(positionOverY.isWithinBounds());

        var positionUnderY = new Position(2, -1);
        assertFalse(positionUnderY.isWithinBounds());

        var positionCorrect = new Position(2, 2);
        assertTrue(positionCorrect.isWithinBounds());
    }
}