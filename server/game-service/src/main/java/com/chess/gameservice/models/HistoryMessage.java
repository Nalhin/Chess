package com.chess.gameservice.models;

import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.turn.GameTurn;
import lombok.*;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoryMessage {
    private ArrayList<GameTurn> gameTurns;
    private String blackPlayer;
    private String whitePlayer;
    private PlayerColor winner;
}
