package com.chess.historyservice.models.external;

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
