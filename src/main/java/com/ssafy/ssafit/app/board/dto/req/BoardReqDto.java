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

    private long board_id;

    private String user_id;

    private String title;

    private long category_id;

    private String content;

    private LocalDateTime registered_time;

    private LocalDateTime modified_time;

    private boolean share;
//    file
//    private String path;
}
