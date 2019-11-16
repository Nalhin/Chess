package com.chess.gameservice.game.player;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Player {
    String name;

    public Player(String name) {
        this.name = name;
    }
}
