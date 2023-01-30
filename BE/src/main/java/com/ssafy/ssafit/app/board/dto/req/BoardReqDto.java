package com.ssafy.ssafit.app.board.dto.req;

import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class BoardReqDto {

    private long board_id;

    private String title;

    private int category_id;

    private String content;

    private Date registered_time;

    private Date modified_time;

    private boolean share;
//    file
//    private String path;
}
