package com.chess.gameservice.availablemoves;

import com.chess.gameservice.game.position.Position;
import lombok.Data;

import java.util.ArrayList;


@Data
public class AvailableMoves {

    private ArrayList<Position> availableMoves;

}
