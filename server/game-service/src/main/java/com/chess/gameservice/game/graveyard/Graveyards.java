package com.chess.gameservice.game.graveyard;

import com.chess.gameservice.game.piece.Piece;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Graveyards {
    private Graveyard whiteGraveyard = new Graveyard();
    private Graveyard blackGraveyard = new Graveyard();

    public void addPieceToCorrectGraveyard(Piece piece) {
        switch (piece.getPlayerColor()) {
            case WHITE:
                whiteGraveyard.addToGraveyard(piece);
                break;
            case BLACK:
                blackGraveyard.addToGraveyard(piece);
                break;
            default:
                break;
        }
    }

}
