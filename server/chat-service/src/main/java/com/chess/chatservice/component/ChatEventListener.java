package com.chess.chatservice.component;

import com.chess.chatservice.model.InfoMessage;
import com.chess.chatservice.service.ChatService;
import com.chess.chatservice.utils.IsoDate;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import java.util.UUID;

@Component
public class ChatEventListener {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    public ChatEventListener(SimpMessagingTemplate messagingTemplate, ChatService chatService) {
        this.messagingTemplate = messagingTemplate;
        this.chatService = chatService;
    }

    private String parseAddress(String address) {
        return address.substring(address.lastIndexOf('/') + 1);
    }

    @EventListener
    public void sessionSubscribeEvent(SessionSubscribeEvent subscribeEvent) throws InterruptedException {
        var accessor = StompHeaderAccessor.wrap(subscribeEvent.getMessage());
        var address = accessor.getDestination();
        if (address != null) {
            var chatId = parseAddress(address);
            chatService.setChatId(accessor.getSubscriptionId(), UUID.fromString(chatId));
            Thread.sleep(1000);
            sendInfoMessage(chatId, "User connected.");
        }
    }

    @EventListener
    public void sessionUnsubscribeEvent(SessionUnsubscribeEvent unsubscribeEvent) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(unsubscribeEvent.getMessage());
        UUID chatId = chatService.getChatIdAndRemoveFromChat(accessor.getSubscriptionId());
        sendInfoMessage(chatId.toString(), "User left the chat.");
    }

    @EventListener
    public void sessionDisconnectEvent(SessionDisconnectEvent disconnectEvent) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(disconnectEvent.getMessage());
        UUID chatId = chatService.getChatIdAndRemoveFromChat(accessor.getSubscriptionId());
        if (chatId != null) {
            sendInfoMessage(chatId.toString(), "User disconnected.");
        }
    }

    private void sendInfoMessage(String chatId, String content) {
        InfoMessage message = new InfoMessage();
        message.setContent(content);
        message.setSendDate(IsoDate.getCurrentIsoDate());
        message.setId(UUID.randomUUID().toString());
        messagingTemplate.convertAndSend("/topic/chat/" + chatId, message);
    }
}
