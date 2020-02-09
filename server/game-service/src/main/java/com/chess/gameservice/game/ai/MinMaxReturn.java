package com.chess.gameservice.game.ai;

import com.chess.gameservice.game.position.Position;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MinMaxReturn {
    private Position initialPosition;
    private Position destinationPosition;
    private int value;

}
