package com.chess.historyservice.dto;


import com.chess.historyservice.models.Game;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.Duration;
import java.time.ZonedDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameWithTurnCountDto{

        private Long gameId;

        private String blackPlayer;

        private String whitePlayer;

        private String winner;

        private ZonedDateTime finishTime;

        private Duration duration;

        private int totalTurns;


        public static GameWithTurnCountDto mapToDto(Game game){
                return GameWithTurnCountDto.builder()
                        .blackPlayer(game.getBlackPlayer())
                        .duration(game.getDuration())
                        .finishTime(game.getFinishTime())
                        .whitePlayer(game.getWhitePlayer())
                        .totalTurns(game.getTurns().size())
                        .winner(game.getWinner())
                        .gameId(game.getGameId())
                        .build();
        }
}
