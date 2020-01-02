package com.chess.gameservice.messages.payloads;

import com.chess.gameservice.game.position.Position;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class PlayerMovePayload {
    private Position initialPosition;
    private Position destinationPosition;

}
