package com.ssafy.ssafit.app.board.dto.resp;

import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.reply.entity.Reply;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Date; // java.sql.Data ?
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class BoardRespDto extends CommonResp {
    private long board_id;

    private long user_id;

    private long category_id;

    private String title;

    private String content;

    private Date registered_time;

    private Date modified_time;

    private int hits;

    private int likes;

    private int downloads;

    private boolean share;

    private List<Reply> replyList;
}
