package com.ssafy.ssafit.app.Notice.dto.req;

import com.ssafy.ssafit.app.board.entity.File;
import com.ssafy.ssafit.app.reply.dto.resp.ReplyRespDto;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class NoticeReqDto {
    private long boardId;

    private String userId;

    private long categoryId;

    private String title;

    private String content;

    private LocalDateTime registeredTime;

    private LocalDateTime modifiedTime;

    private boolean sharePost;

}
