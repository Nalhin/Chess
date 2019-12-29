package com.chess.gameservice.messages;

import com.chess.gameservice.game.Game;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PlayerMovedMessage extends Message<Game> {
    public PlayerMovedMessage() {
        type = MessageTypes.PLAYER_MOVED;
    }
}
