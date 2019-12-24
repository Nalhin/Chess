package com.chess.gameservice.messages;

import com.chess.gameservice.models.GameFound;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameFoundMessage extends Message<GameFound>{
    public GameFoundMessage() {
        type = MessageTypes.GAME_FOUND;
    }
}
