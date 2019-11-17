package com.chess.gameservice.game.graveyard;

import com.chess.gameservice.game.piece.PieceFactory;
import com.chess.gameservice.game.piece.PieceType;
import com.chess.gameservice.game.player.PlayerColor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GraveyardsTest {

    private Graveyards graveyards;
    @BeforeEach
    void setUp() {
        graveyards=new Graveyards();
    }

    @Test
    void addPieceToCorrectGraveyard() {
        var piece = PieceFactory.buildPiece(PieceType.KNIGHT,PlayerColor.BLACK);

        graveyards.addPieceToCorrectGraveyard(piece);

        assertEquals(piece, graveyards.getBlackGraveyard().getPieces().get(0));
    }
}