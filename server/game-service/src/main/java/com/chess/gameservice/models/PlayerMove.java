package com.chess.gameservice.models;

import com.chess.gameservice.game.position.Position;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class PlayerMove {
    private Position initialPosition;
    private Position destinationPosition;

}
