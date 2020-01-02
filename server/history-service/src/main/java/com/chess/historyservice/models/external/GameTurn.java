package com.chess.historyservice.models.external;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class GameTurn {
    private Position initialPosition;
    private Position destinationPosition;
    private PieceType pieceType;
    private PlayerColor playerColor;
    private int turnNumber;
}
