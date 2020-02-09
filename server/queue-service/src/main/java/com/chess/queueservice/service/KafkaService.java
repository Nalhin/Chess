package com.chess.queueservice.service;

import com.chess.queueservice.messages.kafka.StartGameMessage;
import com.chess.queueservice.models.User;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class KafkaService {

    private final String KAFKA_TOPIC = "start-game";
    private final KafkaTemplate<String, StartGameMessage> kafkaTemplate;

    public KafkaService(KafkaTemplate<String, StartGameMessage> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendGameFound(UUID gameId, ArrayList<User> users, boolean withAi) {
        Message<StartGameMessage> message = MessageBuilder
                .withPayload(StartGameMessage
                        .builder().gameId(gameId)
                        .users(users).withAi(withAi).build())
                .setHeader(KafkaHeaders.TOPIC, KAFKA_TOPIC).build();

        kafkaTemplate.send(message);
    }

}
