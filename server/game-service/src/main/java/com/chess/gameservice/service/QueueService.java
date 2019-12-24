package com.chess.gameservice.service;


import com.chess.gameservice.models.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;

@Service
public class QueueService {
    private LinkedList<User> queue = new LinkedList<>();

    public synchronized ArrayList<User>joinQueue(User user) {
        queue.offer(user);
        var users= new ArrayList<User>();

        if (queue.size() >= 2) {
            users.add(queue.remove());
            users.add(queue.remove());
        }
        return users;
    }
}
