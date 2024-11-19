package com.example.ytmt.control;

import com.example.ytmt.Entity.ChatHistoryEntity;
import com.example.ytmt.Repository.ChatHistoryRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class ChatController {

    private final OpenAiChatModel chatModel;
    private final ChatHistoryRepository chatHistoryRepository;

    @Autowired
    public ChatController(OpenAiChatModel chatModel, ChatHistoryRepository chatHistoryRepository) {
        this.chatModel = chatModel;
        this.chatHistoryRepository = chatHistoryRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/ai/generate")
    public Map<String, String> generate(@RequestBody Map<String, String> request) {
        String userMessage = request.get("prompt");

        // JSON 배열로 대화 관리
        JSONArray messages = new JSONArray();
        messages.put(new JSONObject(Map.of("role", "user", "content", userMessage)));

        // 사용자 입력을 AI 모델에 전달
        String botReply = chatModel.call(userMessage);

        // Bot 응답 추가
        messages.put(new JSONObject(Map.of("role", "assistant", "content", botReply)));

        // JSON 대화 기록 저장
        ChatHistoryEntity chatHistory = new ChatHistoryEntity();
        chatHistory.setConversation(messages.toString());
        chatHistoryRepository.save(chatHistory);

        return Map.of("genera", botReply);
    }
}
