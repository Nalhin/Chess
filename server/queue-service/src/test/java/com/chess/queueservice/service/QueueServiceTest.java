package com.chess.queueservice.service;

import com.chess.queueservice.exception.QueueException;
import com.chess.queueservice.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@ExtendWith(MockitoExtension.class)
class QueueServiceTest {

    @Mock
    private KafkaTemplate<String, String>  kafkaTemplate;

    @InjectMocks
    private QueueService queueService;

    @BeforeEach
    void setUp() {
        queueService = new QueueService(kafkaTemplate);
    }

    @Test
    void joinQueue() throws QueueException {
        var firstUser = new User("1");
        var secondUser = new User("2");

        var users = queueService.joinQueue(firstUser);
        assertNull(users);

        users = queueService.joinQueue(secondUser);
        assertEquals(users.size(), 2);
    }

    @Test
    void getQueueSize() throws QueueException {
        var firstUser = new User("1");
        int expectedCount = 1;

        queueService.joinQueue(firstUser);
        int userCount = queueService.getQueueSize();

        assertEquals(expectedCount, userCount);
    }
}