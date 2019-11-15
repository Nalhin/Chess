package com.chess.gameservice.messages;

import com.chess.gameservice.game.Game;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
class GameStartedMessage extends Message<Game> {
    GameStartedMessage() {
        type = MessageTypes.GAME_STARTED;
    }
}
