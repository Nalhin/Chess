package com.chess.gameservice.messages;

import com.chess.gameservice.game.Game;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public
class GameStartedMessage extends Message<Game> {
    public GameStartedMessage() {
        type = MessageTypes.GAME_STARTED;
    }
}
