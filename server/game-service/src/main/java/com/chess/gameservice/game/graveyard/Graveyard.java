package com.chess.gameservice.game.graveyard;

import com.chess.gameservice.game.piece.Piece;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
class Graveyard implements Serializable {
    private ArrayList<Piece> pieces = new ArrayList<>();


    @JsonValue
    public ArrayList<Piece> getPieces(){
        return pieces;
    }

    void addToGraveyard(Piece piece){
        pieces.add(piece);
    }
}
