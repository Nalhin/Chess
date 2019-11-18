package com.chess.gameservice.messages;

import com.chess.gameservice.models.GameError;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public
class GameErrorMessage extends Message<GameError> {

    public GameErrorMessage() {
        type = MessageTypes.GAME_ERROR;
    }
}
