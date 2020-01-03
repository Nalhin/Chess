package com.chess.gameservice.service;

import com.chess.gameservice.game.Game;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.messages.events.GameOverEvent;
import com.chess.gameservice.messages.kafka.HistoryMessage;
import org.springframework.context.ApplicationListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;


@Service
public class KafkaService implements ApplicationListener<GameOverEvent> {

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
                                .duration(game.getGameDuration())
                                .blackPlayer(game.getPlayers().get(PlayerColor.BLACK).getName())
                                .whitePlayer(game.getPlayers().get(PlayerColor.WHITE).getName())
                                .winner(game.getCurrentTurn().getCurrentPlayerColor()).build())
                        .setHeader(KafkaHeaders.TOPIC, kafkaTopic)
                        .build();

        kafkaTemplate.send(message);
    }


    @Override
    public void onApplicationEvent(GameOverEvent event) {
        Game game = event.getGame();
        sendHistory(game);
    }
}