package com.chess.gameservice.messages;

import com.chess.gameservice.game.Game;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
class PlayedMovedMessage extends Message<Game> {
    PlayedMovedMessage() {
        type = MessageTypes.PLAYER_MOVED;
    }
}
