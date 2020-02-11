package com.chess.queueservice.service;

import com.chess.queueservice.exception.QueueException;
import com.chess.queueservice.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@ExtendWith(MockitoExtension.class)
class QueueServiceTest {

    private QueueService queueService;

    @BeforeEach
    void setUp() {
        queueService = new QueueService();
    }

    @Test
    void joinQueue() throws QueueException {
        User firstUser = new User("1", "1");
        User secondUser = new User("2", "1");

        var users = queueService.joinQueue(firstUser);
        assertEquals(users.size(),0);

        users = queueService.joinQueue(secondUser);
        assertEquals(users.size(), 2);
    }

    @Test
    void removeUser() throws QueueException {
        String sessionId = "2";
        User firstUser = new User("1", sessionId);
        int expectedCount = 0;

        queueService.joinQueue(firstUser);
        queueService.removeUser(sessionId);

        assertEquals(expectedCount, queueService.getQueue().size());
    }
}