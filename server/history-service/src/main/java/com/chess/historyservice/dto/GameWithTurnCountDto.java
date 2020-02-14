package com.chess.historyservice.dto;


import com.chess.historyservice.models.Game;
import lombok.*;

import java.time.Duration;
import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameWithTurnCountDto {

        private Long gameId;

        private String blackPlayerName;

        private String whitePlayerName;

        private String winner;

        private LocalDateTime finishTime;

        private Duration duration;

        private int totalTurns;


        public static GameWithTurnCountDto mapToDto(Game game){
                return GameWithTurnCountDto.builder()
                        .blackPlayerName(game.getBlackPlayer())
                        .duration(game.getDuration())
                        .finishTime(game.getFinishTime())
                        .whitePlayerName(game.getWhitePlayer())
                        .totalTurns(game.getTurns().size())
                        .winner(game.getWinner())
                        .gameId(game.getGameId())
                        .build();
        }
}
