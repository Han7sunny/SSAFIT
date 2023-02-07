package com.ssafy.ssafit.app.reply.dto.resp;

import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.reply.entity.Reply;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class ReplyRespDto extends CommonResp {

    private long board_id;

    private long reply_id;

    private String user_id;

    private String userName;

    private String content;

    private Date registered_time;

    private boolean includedGroup; // 그룹 포함 여부

    public ReplyRespDto(Reply reply, boolean success){
        this.setSuccess(success);
        this.board_id = reply.getBoard().getId();
        this.reply_id = reply.getId();
        this.user_id = reply.getUser().getId();
        this.userName = reply.getUser().getName();
        this.content = reply.getContent();
        this.registered_time = reply.getRegisteredTime();
    }
}
