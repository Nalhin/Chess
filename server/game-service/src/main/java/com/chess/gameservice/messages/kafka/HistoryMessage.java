package com.chess.gameservice.messages.kafka;

import com.chess.gameservice.game.turn.GameTurn;
import lombok.*;

import java.time.Duration;
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
    private String winner;
    private Duration duration;
}
