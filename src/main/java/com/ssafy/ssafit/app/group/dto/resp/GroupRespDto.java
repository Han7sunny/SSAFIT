package com.ssafy.ssafit.app.group.dto.resp;

import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.group.entity.Group;
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
public class GroupRespDto extends CommonResp {
    private long groupId;

    private String name;

    private String goal;

    private String penalty;

    private double achievement_rate;

    private LocalDate start_date;

    private LocalDate end_date;

    private int period; // ?

    private int maximum_member;

    private int current_member;

    public GroupRespDto(Group group){
        this.groupId = group.getId();
        this.name = group.getName();
        this.goal = group.getGoal();
        this.penalty = group.getPenalty();
        this.achievement_rate = group.getAchievement_rate();
        this.start_date = group.getStart_date();
        this.end_date = group.getEnd_date();
        this.period = group.getPeriod();
        this.maximum_member = group.getMaximum_member();
        this.current_member = group.getCurrent_member();
    }

}
