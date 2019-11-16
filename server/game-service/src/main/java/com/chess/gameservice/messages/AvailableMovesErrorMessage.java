package com.chess.gameservice.messages;

import com.chess.gameservice.moves.AvailableMovesError;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
class AvailableMovesErrorMessage extends Message<AvailableMovesError> {

    AvailableMovesErrorMessage() {
        type = MessageTypes.AVAILABLE_MOVES_ERROR;
    }
}
