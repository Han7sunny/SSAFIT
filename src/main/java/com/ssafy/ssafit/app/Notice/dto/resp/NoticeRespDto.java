package com.ssafy.ssafit.app.Notice.dto.resp;


import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.board.entity.File;
import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.reply.dto.resp.ReplyRespDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class NoticeRespDto extends CommonResp {

    private long boardId;

    private String userId;

    private String userName;

    private long categoryId;

    private String title;

    private String content;

    private LocalDateTime registeredTime;

    private LocalDateTime modifiedTime;

    private int hits;

    private int likes;

    private boolean clickLikes; // 좋아요 이미 눌렀는지 안 눌렀는지

    private boolean sharePost;

    private long replySize;

    private List<ReplyRespDto> replyList;

//    private List<File> fileList;

    public NoticeRespDto(Board board){
        this.boardId = board.getId();
        this.userId = board.getUser().getId();
        this.userName = board.getUser().getName();
        this.categoryId = board.getCategory().getId();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.registeredTime = board.getRegisteredTime();
        this.modifiedTime = board.getModifiedTime();
        this.sharePost = board.isSharePost();
        this.hits = board.getHits();
        this.likes = board.getLikes();
    }
}
