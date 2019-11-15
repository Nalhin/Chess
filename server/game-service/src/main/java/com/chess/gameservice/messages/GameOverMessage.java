package com.chess.gameservice.messages;

import com.chess.gameservice.game.Game;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
class GameOverMessage extends Message<Game> {
    GameOverMessage() {
        type = MessageTypes.GAME_OVER;
    }
}
