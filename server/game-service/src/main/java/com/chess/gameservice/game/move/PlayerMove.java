package com.chess.gameservice.game.move;

import com.chess.gameservice.game.position.Position;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlayerMove {
    private Position initialPosition;
    private Position destinationPosition;

}
