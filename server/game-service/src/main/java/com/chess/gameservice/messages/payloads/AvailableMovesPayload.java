package com.chess.gameservice.messages.payloads;

import com.chess.gameservice.game.position.Position;
import lombok.Data;

import java.util.ArrayList;


@Data
public class AvailableMovesPayload {

    private ArrayList<Position> availableMoves;
    private Position position;
}
