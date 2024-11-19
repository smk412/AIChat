package com.example.ytmt.Service;

import com.example.ytmt.Entity.ChatHistoryEntity;
import com.example.ytmt.Repository.ChatHistoryRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class ChatService {

    private static final Logger logger = LoggerFactory.getLogger(ChatService.class); // Logger 선언

    private final ChatHistoryRepository chatHistoryRepository;

    @Autowired
    public ChatService(ChatHistoryRepository chatHistoryRepository) {
        this.chatHistoryRepository = chatHistoryRepository;
    }

    public void saveChatMessage(String sender, String text) {
        // JSON 메시지 구성
        JSONArray messages = new JSONArray();
        messages.put(new JSONObject().put("role", sender).put("content", text));

        // 전체 JSON 객체로 감싸기
        JSONObject wrappedMessages = new JSONObject();
        wrappedMessages.put("messages", messages);

        // 로그 출력
        logger.info("Saving chat message: " + wrappedMessages.toString());

        // ChatHistoryEntity에 저장
        ChatHistoryEntity chatHistory = new ChatHistoryEntity();
        chatHistory.setConversation(wrappedMessages.toString());
        chatHistoryRepository.save(chatHistory);
    }
}
