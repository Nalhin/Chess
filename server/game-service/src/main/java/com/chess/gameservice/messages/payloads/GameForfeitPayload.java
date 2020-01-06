package com.chess.gameservice.messages.payloads;

import com.chess.gameservice.game.Game;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameForfeitPayload {
    private Game game;
    private String name;
}
