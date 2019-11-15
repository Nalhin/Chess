package com.chess.gameservice.messages;

import com.chess.gameservice.availablemoves.AvailableMoves;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
class AvailableMovesMessage extends Message<AvailableMoves> {

    AvailableMovesMessage() {
        type = MessageTypes.AVAILABLE_MOVES;
    }
}
