package com.chess.gameservice.service;

import com.chess.gameservice.game.Game;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.models.HistoryMessage;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;


@Service
public class KafkaService {

    String kafkaTopic = "game";

    private final KafkaTemplate<String, HistoryMessage> kafkaTemplate;

    public KafkaService(KafkaTemplate<String, HistoryMessage> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendHistory(Game game) {
        Message<HistoryMessage> message =
                MessageBuilder
                        .withPayload(HistoryMessage.builder()
                                .gameTurns(game.getGameTurns())
                                .blackPlayer(game.getPlayers().get(PlayerColor.BLACK).getName())
                                .whitePlayer(game.getPlayers().get(PlayerColor.WHITE).getName())
                                .winner(game.getCurrentTurn()).build())
                        .setHeader(KafkaHeaders.TOPIC, kafkaTopic)
                        .build();

        kafkaTemplate.send(message);
    }
}