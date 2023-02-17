package com.ssafy.ssafit.app.board.dto.resp;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.board.entity.File;
import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.reply.dto.resp.ReplyRespDto;
import com.ssafy.ssafit.app.reply.entity.Reply;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date; // java.sql.Data ?
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class BoardRespDto extends CommonResp {

//    @Builder
    public BoardRespDto(BoardReqDto boardReqDto){
        super();
        this.boardId = boardReqDto.getBoardId();
        this.userId = boardReqDto.getUserId();
        this.categoryId = boardReqDto.getCategoryId();
        this.title = boardReqDto.getTitle();
        this.content = boardReqDto.getContent();
        this.registeredTime = boardReqDto.getRegisteredTime();
        this.modifiedTime = boardReqDto.getModifiedTime();
        this.sharePost = boardReqDto.isSharePost();
    }

    public BoardRespDto(Board board){
        this.boardId = board.getId();
        this.userId = board.getUser().getId();
        this.userName = board.getUser().getName();
        this.categoryId = board.getCategory().getId();
        if(board.getCategory().getId() == 3) { // 운동 루틴 공유글
            this.routineId = board.getRoutine().getRoutineId();
        }
        this.title = board.getTitle();
        this.content = board.getContent();
        this.registeredTime = board.getRegisteredTime();
        this.modifiedTime = board.getModifiedTime();
        this.sharePost = board.isSharePost();
        this.hits = board.getHits();
        this.downloads = board.getDownloads();
        this.likes = board.getLikes();
//        this.replyList = board.getReplyList();
    }

    private long boardId;

    private String userId;

    private String userName;

    private long categoryId;

    private long routineId;

    private String title;

    private String content;

    private LocalDateTime registeredTime;

    private LocalDateTime modifiedTime;

    private int hits;

    private int likes;

    private boolean clickLikes; // 좋아요 이미 눌렀는지 안 눌렀는지

    private int downloads;

    private boolean sharePost;

    private long replySize;

    private List<ReplyRespDto> replyList;

    private List<File> fileList;
}
