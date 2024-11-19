package com.example.ytmt.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "chat_history")
@Data
public class ChatHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String conversation; // JSON 형식으로 대화 기록 저장
}
