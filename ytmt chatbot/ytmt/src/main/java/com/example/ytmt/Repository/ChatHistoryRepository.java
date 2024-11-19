package com.example.ytmt.Repository;

import com.example.ytmt.Entity.ChatHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatHistoryRepository extends JpaRepository<ChatHistoryEntity, Long> {
}

