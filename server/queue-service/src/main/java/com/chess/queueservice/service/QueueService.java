package com.chess.queueservice.service;


import com.chess.queueservice.exception.QueueException;
import com.chess.queueservice.models.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Optional;


@Service
@Getter
@Setter
public class QueueService {

    private final LinkedList<User> queue = new LinkedList<>();

    public synchronized ArrayList<User> joinQueue(User user) throws QueueException {
        if (queue.contains(user)) {
            throw new QueueException("Player already in queue.");
        }
        ArrayList<User> users = new ArrayList<>();
        queue.offer(user);
        if (queue.size() >= 2) {
            users.add(queue.remove());
            users.add(queue.remove());
        }
        return users;
    }

    public synchronized void removeUser(String sessionId) {
        queue.removeIf(user -> user.getSessionId().equals(sessionId));
    }
}
