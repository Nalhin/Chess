package com.chess.gameservice.messages;

import com.chess.gameservice.moves.AvailableMovesError;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public
class AvailableMovesErrorMessage extends Message<AvailableMovesError> {

    public AvailableMovesErrorMessage() {
        type = MessageTypes.AVAILABLE_MOVES_ERROR;
    }
}
