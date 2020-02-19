package com.chess.queueservice.service;

import com.chess.queueservice.messages.kafka.StartGameMessage;
import com.chess.queueservice.models.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.support.GenericMessage;

import java.util.ArrayList;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
class KafkaServiceTest {

    @Mock
    private KafkaTemplate<String, StartGameMessage> kafkaTemplate;

    @InjectMocks
    KafkaService kafkaService;

    @Test
    void sendGameFound() {
        ArrayList<User> users = new ArrayList<>();
        users.add(new User("login", ""));
        users.add(new User("login1", ""));
        kafkaService.sendGameFound(UUID.randomUUID(), users, false);

        Mockito.verify(kafkaTemplate, times(1))
                .send(any(GenericMessage.class));
    }
}