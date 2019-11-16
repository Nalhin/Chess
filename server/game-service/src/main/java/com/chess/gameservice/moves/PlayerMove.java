package com.chess.gameservice.moves;

import com.chess.gameservice.game.position.Position;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PlayerMove {
    private Position initialPosition;
    private Position destinationPosition;

    public PlayerMove(Position initialPosition, Position destinationPosition) {
        this.initialPosition = initialPosition;
        this.destinationPosition = destinationPosition;
    }
}
