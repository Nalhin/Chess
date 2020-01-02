package com.chess.gameservice.game.turn;

import com.chess.gameservice.game.piece.PieceType;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class GameTurn {
    Position initialPosition;
    Position destinationPosition;
    PieceType pieceType;
    PlayerColor playerColor;
}
