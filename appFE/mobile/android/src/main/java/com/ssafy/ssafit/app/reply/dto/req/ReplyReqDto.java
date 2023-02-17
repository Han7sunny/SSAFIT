package com.ssafy.ssafit.app.reply.dto.req;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ReplyReqDto {
    private long reply_id;

    private long board_id;

    private String user_id;

    private String content;

    private Date registered_time;

}
