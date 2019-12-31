package com.chess.gameservice.models;


import com.chess.gameservice.game.piece.PieceType;
import com.chess.gameservice.game.position.Position;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserPromotionPayload {
    private PieceType pieceType;
    private Position position;
}
