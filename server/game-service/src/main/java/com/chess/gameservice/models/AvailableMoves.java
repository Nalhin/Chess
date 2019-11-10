package com.chess.gameservice.models;

import com.chess.gameservice.game.position.Position;
import lombok.Data;

import java.io.Serializable;
import java.util.List;


@Data
public class AvailableMoves implements Serializable {

    private List<Position> availableMoves;

}
