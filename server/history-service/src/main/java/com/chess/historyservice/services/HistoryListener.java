package com.chess.historyservice.services;

import com.chess.historyservice.models.Game;
import com.chess.historyservice.models.Turn;
import com.chess.historyservice.models.external.HistoryMessage;
import com.chess.historyservice.repositories.HistoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class HistoryListener {

    private final HistoryRepository historyRepository;

    @KafkaListener(topics = "game")
    public void receiveGameData(@Payload HistoryMessage historyMessage) {

        Game game = new Game();
        List<Turn> turns = historyMessage
                .getGameTurns()
                .stream()
                .map(t -> Turn.builder()
                        .game(game)
                        .initialPosition(t.getInitialPosition())
                        .destinationPosition(t.getDestinationPosition())
                        .pieceType(t.getPieceType())
                        .turnNumber(t.getTurnNumber())
                        .playerColor(t.getPlayerColor()).build())
                        .collect(Collectors.toList());


        game.setBlackPlayer(historyMessage.getBlackPlayer());
        game.setWhitePlayer(historyMessage.getWhitePlayer());
        game.setTurns(turns);
        game.setWinner(historyMessage.getWinner());
        game.setDuration(historyMessage.getDuration());

        historyRepository.save(game);
    }
}