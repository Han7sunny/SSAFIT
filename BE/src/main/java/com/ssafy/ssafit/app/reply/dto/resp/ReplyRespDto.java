package com.ssafy.ssafit.app.reply.dto.resp;

import com.ssafy.ssafit.app.common.CommonResp;
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

    private String content;

    private Date registered_time;

}
