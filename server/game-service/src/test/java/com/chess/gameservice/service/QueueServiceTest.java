package com.chess.gameservice.service;

import com.chess.gameservice.exception.QueueException;
import com.chess.gameservice.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class QueueServiceTest {

    private QueueService queueService;

    @BeforeEach
    void setUp() {
        queueService = new QueueService();
    }

    @Test
    void joinQueue() throws QueueException {
        var firstUser= User.builder().name("1").sessionId("1").build();
        var secondUser= User.builder().name("2").sessionId("2").build();

        var users =queueService.joinQueue(firstUser);
        assertEquals(users.size(),0);

        users =queueService.joinQueue(secondUser);
        assertEquals(users.size(),2);
    }
}