package com.chess.queueservice.service;


import com.chess.queueservice.exception.QueueException;
import com.chess.queueservice.models.User;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;


@Service
public class QueueService {
    private final String TOPIC = "users";

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final LinkedList<User> queue = new LinkedList<>();


    public QueueService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }


    public synchronized ArrayList<User> joinQueue(User user) throws QueueException {
        if (queue.contains(user)) {
            throw new QueueException("Player already in queue.");
        }
        queue.offer(user);

        if (queue.size() >= 2) {
            var users = new ArrayList<User>();
            users.add(queue.remove());
            users.add(queue.remove());
            return users;
        }
        return null;
    }

    public synchronized int getQueueSize() {
        return queue.size();
    }


}
