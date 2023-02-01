package com.ssafy.ssafit.app.group.dto.resp;

import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class GroupRecruitRespDto extends BoardRespDto {

    private long group_id;

    private String groupName;

    private String goal;

    private String penalty;

    private double achievement_rate;

    //    @Temporal(TemporalType.TIMESTAMP)
    private LocalDate start_date;

//    @Temporal(TemporalType.TIMESTAMP)

    private LocalDate end_date;

    private int period;

    private int maximum_member;

    private int current_member;
}
