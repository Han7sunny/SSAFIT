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
        this.board_id = boardReqDto.getBoard_id();
        this.user_id = boardReqDto.getUser_id();
        this.category_id = boardReqDto.getCategory_id();
        this.title = boardReqDto.getTitle();
        this.content = boardReqDto.getContent();
        this.registered_time = boardReqDto.getRegistered_time();
        this.modified_time = boardReqDto.getModified_time();
        this.share = boardReqDto.isShare();
    }

    public BoardRespDto(Board board){
        this.board_id = board.getId();
        this.user_id = board.getUser().getId();
//        this.category_id = board.getCategory().getId();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.registered_time = board.getRegistered_time();
        this.modified_time = board.getModified_time();
        this.share = board.isShare();
    }

    private long board_id;

    private String user_id;

    private long category_id;

    private String title;

    private String content;

    private LocalDateTime registered_time;

    private LocalDateTime modified_time;

    private int hits;

    private int likes;

    private int downloads;

    private boolean share;

    private List<Reply> replyList;
}
