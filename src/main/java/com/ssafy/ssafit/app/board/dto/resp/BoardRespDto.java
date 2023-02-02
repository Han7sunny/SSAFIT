package com.ssafy.ssafit.app.board.dto.resp;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.common.CommonResp;
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
        this.share = boardReqDto.isShare();
    }

    public BoardRespDto(Board board){
        this.boardId = board.getId();
        this.userId = board.getUser().getId();
//        this.category_id = board.getCategory().getId();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.registeredTime = board.getRegistered_time();
        this.modifiedTime = board.getModified_time();
        this.share = board.isShare();
    }

    private long boardId;

    private String userId;

    private long categoryId;

    private String title;

    private String content;

    private LocalDateTime registeredTime;

    private LocalDateTime modifiedTime;

    private int hits;

    private int likes;

    private int downloads;

    private boolean share;

    private List<Reply> replyList;
}
