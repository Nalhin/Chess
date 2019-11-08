package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public abstract class Piece {

    private Position position;
    private PlayerColor playerColor;

    public abstract List<Position> getAvailableMoves();

    public abstract boolean isMoveLegal(Position movePosition);

}
