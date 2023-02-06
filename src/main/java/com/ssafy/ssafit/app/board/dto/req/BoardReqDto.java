package com.ssafy.ssafit.app.board.dto.req;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class BoardReqDto {

    private long boardId;

    private String userId;

    private long groupId;

    private long routineId;

    private String title;

    private long categoryId;

    private String content;

    private LocalDateTime registeredTime;

    private LocalDateTime modifiedTime;

    private boolean sharePost;

}
