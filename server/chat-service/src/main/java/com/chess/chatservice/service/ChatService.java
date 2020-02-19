package com.chess.chatservice.service;

import com.chess.chatservice.model.User;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class ChatService {
    private final HashMap<String, User> userHashMap = new HashMap<>();

    public void addUser(String playerSessionId, User user) {
        userHashMap.put(playerSessionId, user);
    }

    public User getChatIdAndRemoveUser(String playerSessionId) {
        User user = userHashMap.get(playerSessionId);
        userHashMap.remove(playerSessionId);
        return user;
    }
}
