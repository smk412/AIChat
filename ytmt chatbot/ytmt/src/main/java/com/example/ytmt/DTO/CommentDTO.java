package com.example.ytmt.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CommentDTO {
    private Long boardId;
    private String author;
    private String content;

    // Setter 메서드
    public void setAuthor(String author){
        this.author=author;
    }

    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
