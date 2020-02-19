package com.chess.queueservice.service;

import com.chess.queueservice.messages.kafka.StartGameMessage;
import com.chess.queueservice.models.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class KafkaService {

    @Value("${kafka-topics.start-game}")
    private String KAFKA_START_GAME_TOPIC;
    private final KafkaTemplate<String, StartGameMessage> kafkaTemplate;

    public KafkaService(KafkaTemplate<String, StartGameMessage> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendGameFound(UUID gameId, ArrayList<User> users, boolean withAi) {
        Message<StartGameMessage> message = MessageBuilder
                .withPayload(StartGameMessage
                        .builder().gameId(gameId)
                        .users(users).withAi(withAi).build())
                .setHeader(KafkaHeaders.TOPIC, KAFKA_START_GAME_TOPIC).build();

        kafkaTemplate.send(message);
    }

}
