package com.chess.gameservice.messages;

import com.chess.gameservice.game.Game;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlayerMovedMessage extends Message<Game> {
    public PlayerMovedMessage() {
        type = MessageTypes.PLAYER_MOVED;
    }
}
